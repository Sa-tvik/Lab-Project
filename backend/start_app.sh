#!/bin/bash
# Startup script for DigitalOcean Droplet
# Save as start_app.sh

echo "Starting Flask API server..."

# Activate virtual environment (if using)
# source venv/bin/activate

# Set environment variables
export FLASK_ENV=production

# Start with Gunicorn
gunicorn -c gunicorn.conf.py app:app

echo "Flask API server started on port 5000"
