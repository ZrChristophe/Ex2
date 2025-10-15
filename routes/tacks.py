from flask import Blueprint
from controllers import task_controller as controller

tasks_bp = Blueprint('tasks', __name__)

tasks_bp.add_url_rule('/', 'list_tasks', controller.list_tasks, methods=['GET'])
tasks_bp.add_url_rule('/<task_id>', 'get_task', controller.get_task, methods=['GET'])
tasks_bp.add_url_rule('/', 'create_task', controller.create_task, methods=['POST'])
tasks_bp.add_url_rule('/<task_id>', 'update_task', controller.update_task, methods=['PATCH'])
tasks_bp.add_url_rule('/<task_id>', 'delete_task', controller.delete_task, methods=['DELETE'])
