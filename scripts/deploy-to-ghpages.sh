#!/bin/bash

cd "$(dirname "$0")"
cd ..

git checkout master
# npm run dist:compile
git checkout gh-pages

rm -rf scripts styles images app
cp -r dist/. .

git checkout master
