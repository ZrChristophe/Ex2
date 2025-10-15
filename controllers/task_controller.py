from flask import request, jsonify
from models.task_model import task_model

def list_tasks():
    tasks = task_model.get_all()
    return jsonify(tasks), 200

def get_task(task_id):
    task = task_model.get_by_id(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    return jsonify(task), 200

def create_task():
    data = request.get_json() or {}
    title = data.get('title')
    description = data.get('description', '')
    if not title or not isinstance(title, str):
        return jsonify({'error': 'title is required and must be a string'}), 400
    task = task_model.create(title=title, description=description)
    return jsonify(task), 201

def update_task(task_id):
    data = request.get_json() or {}
    # validate minimalement completed type si présent
    if 'completed' in data and not isinstance(data['completed'], bool):
        return jsonify({'error': 'completed must be a boolean'}), 400
    task = task_model.update(task_id, data)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    return jsonify(task), 200

def delete_task(task_id):
    ok = task_model.delete(task_id)
    if not ok:
        return jsonify({'error': 'Task not found'}), 404
    return '', 204
