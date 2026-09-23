#!/usr/bin/env bash
# Rebuild the content index, then serve the course on http://localhost:4174
set -e
cd "$(dirname "$0")"
python3 tools/build.py
PORT="${1:-4174}"
echo
echo "  Programming Foundations  ->  http://localhost:$PORT"
echo "  (ctrl-c to stop)"
echo
python3 -m http.server "$PORT" --bind 127.0.0.1
