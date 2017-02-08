#!/usr/bin/env python
import os
import sys
import time
import mimetypes
import hashlib
import boto
from boto.s3.connection import OrdinaryCallingFormat
from boto.s3.key import Key
from pathlib import Path


BUCKET_NAME = "www.kristelteng.com"

GLOB_PATTERNS = (
    "*.html",
    "*.css",
    "*.js",
    "*.jpg",
    "*.png",
    "*.gif",
    "*.ico",
    "*.svg",
    "*.otf",
    "*.eot",
    "*.ttf",
    "*.woff",
    "*.woff2",
    "*.pdf",
)

# getting around dots in S3 bucket names
s3 = boto.s3.connect_to_region(
    'us-east-1', calling_format=OrdinaryCallingFormat())


def get_s3_headers():
    return {
        'Cache-Control': 'public, max-age={}'.format(24*60*60),
        'Content-Disposition': 'inline',
    }


def get_paths():
    local_dir = Path("./_site")
    paths = []
    for pattern in GLOB_PATTERNS:
        paths.extend([p
                      for p in local_dir.rglob(pattern)
                      if p.is_file() and p.stat().st_size])
    return paths


def upload_to_s3(bucket_name, file_paths, force=False):
    bucket = s3.get_bucket(bucket_name)

    skip_count = 0
    upload_count = 0

    for path in file_paths:
        dir_path = path.as_posix()
        parts = dir_path.split('/')
        key_name = os.path.join(*parts[1:]) # skip jekyll's _site directory name

        k = bucket.get_key(key_name)
        if not force and (k is not None):
            # file exists on S3
            md5_hash = hashlib.md5(path.open("rb").read()).hexdigest()
            if md5_hash == k.etag[1:-1]:
                # skip if it's the same file
                print "skipping {}".format(dir_path)
                skip_count += 1
                continue

        mime_type = mimetypes.guess_type(dir_path)[0]

        if mime_type is None:
            mime_type = "text/plain"

        print "uploading {} as {}".format(dir_path, mime_type)

        headers = get_s3_headers()
        headers['Content-Type'] = mime_type

        k = Key(bucket)
        k.name = key_name
        k.set_contents_from_filename(dir_path, headers=headers)
        k.set_acl("public-read")
        upload_count += 1

    return {"skipped": skip_count, "uploaded": upload_count}


def main():
    start = time.time()

    force_upload = False

    if len(sys.argv) > 1:
        force_upload = (sys.argv[1] == "--force")

    file_paths = get_paths()
    results = upload_to_s3(BUCKET_NAME, file_paths, force_upload)
    end = time.time()

    time_taken = int(end-start)

    print "\n===== summary ======"
    print "skipped: {} files".format(results["skipped"])
    print "uploaded: {} files".format(results["uploaded"])
    print "total: {} files".format(results["skipped"] + results["uploaded"])
    print "time taken: {} secs".format(time_taken)

if __name__ == "__main__":
    main()
