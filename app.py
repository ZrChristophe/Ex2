from flask import Flask, jsonify
from routes.tasks import tasks_bp

def create_app():
    app = Flask(__name__)
    app.register_blueprint(tasks_bp, url_prefix='/tasks')

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"error": "Not Found"}), 404

    @app.errorhandler(500)
    def internal_error(e):
        return jsonify({"error": "Internal Server Error"}), 500

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(port=3000, debug=True)
