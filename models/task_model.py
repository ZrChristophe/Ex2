# models/task_model.py
import json
import os
import threading
from uuid import uuid4
from datetime import datetime

# Emplacement du fichier de données (un niveau au-dessus du dossier models)
DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')
DATA_FILE = os.path.join(DATA_DIR, 'tasks.json')

class TaskModel:
    def __init__(self):
        self.lock = threading.Lock()
        # s'assurer que le dossier existe
        os.makedirs(DATA_DIR, exist_ok=True)
        # créer le fichier s'il n'existe pas
        if not os.path.exists(DATA_FILE):
            with open(DATA_FILE, 'w', encoding='utf-8') as f:
                json.dump([], f, ensure_ascii=False, indent=2)
        # charger en mémoire (mais on relaod à chaque opération pour rester cohérent)
        self._load()

    def _load(self):
        """Charge les tâches depuis le fichier dans self.tasks."""
        with self.lock:
            try:
                with open(DATA_FILE, 'r', encoding='utf-8') as f:
                    self.tasks = json.load(f)
            except (json.JSONDecodeError, FileNotFoundError):
                self.tasks = []

    def _save(self):
        """Sauve self.tasks dans le fichier JSON."""
        with self.lock:
            with open(DATA_FILE, 'w', encoding='utf-8') as f:
                json.dump(self.tasks, f, ensure_ascii=False, indent=2)

    def get_all(self):
        """Retourne la liste de toutes les tâches."""
        self._load()
        return self.tasks

    def get_by_id(self, id_):
        """Retourne une tâche par id (ou None si introuvable)."""
        self._load()
        return next((t for t in self.tasks if t.get('id') == id_), None)

    def create(self, title, description=''):
        """Crée une nouvelle tâche et la persiste."""
        new_task = {
            'id': str(uuid4()),
            'title': title,
            'description': description,
            'completed': False,
            'createdAt': datetime.utcnow().isoformat() + 'Z'
        }
        # Chargement, ajout, sauvegarde atomique
        self._load()
        self.tasks.append(new_task)
        self._save()
        return new_task

    def delete(self, id_):
        """Supprime la tâche par id. Retourne True si supprimée, False sinon."""
        self._load()
        idx = next((i for i, t in enumerate(self.tasks) if t.get('id') == id_), None)
        if idx is None:
            return False
        self.tasks.pop(idx)
        self._save()
        return True

    def update(self, id_, fields: dict):
        """
        Met à jour la tâche (fields peut contenir title, description, completed).
        Retourne la tâche modifiée ou None si non trouvée.
        """
        self._load()
        task = self.get_by_id(id_)
        if not task:
            return None

        # Autoriser uniquement certains champs pour éviter l'injection de clés arbitraires
        for k in ('title', 'description', 'completed'):
            if k in fields:
                task[k] = fields[k]
        self._save()
        return task

# Exporter une instance singleton utilisable dans toute l'app
task_model = TaskModel()
