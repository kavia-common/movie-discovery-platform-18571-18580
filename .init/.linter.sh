#!/bin/bash
cd /home/kavia/workspace/code-generation/movie-discovery-platform-18571-18580/movie_discovery_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

