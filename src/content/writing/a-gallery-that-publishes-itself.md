---
title: A photo gallery that publishes itself
description: Drop a photo in a folder and it's on the site a few seconds later, with the GPS data stripped.
date: 2026-10-19
draft: true
---

I take photos of buildings and streets, mostly on a pocket-sized Sony RX100 VII. I wanted to share them without an upload form, without editing a page, and without rebuilding a site every time.

So I built Stilllight. You drop a photo in a folder, and a few seconds later it's [on the site](/photos/).

## How it works

A small Node script watches a local folder called `originals/`. When a new image appears, it waits until the file size has stopped changing, so a half-copied file isn't processed, and then runs two steps:

1. **Process.** With `sharp`, it rotates the image the right way up and makes two sizes: a 480 px thumbnail and a 1600 px full image. It reads a few EXIF fields (camera, aperture, shutter speed, ISO, date) and leaves out the GPS coordinates. Then it writes everything into a `manifest.json`.
2. **Upload.** It sends the files to Cloudflare R2 over the S3 API. Before each upload it compares the file's MD5 with the ETag already in the bucket, so unchanged photos are skipped.

The website itself never changes. When the page loads, it fetches `manifest.json` and builds the grid from it. A new photo is just a new entry in that file, so there's nothing to rebuild or deploy.

## Caching

The two kinds of file get opposite rules:

- **Photos never change** once they're uploaded, so they're cached for a year.
- **The manifest changes** with every new photo, so it's sent with `no-cache` and the page fetches it fresh.

That keeps the photos fast while new ones show up straight away.

## Privacy

Photos from phones and many cameras carry the exact place they were taken. For street photos that's often harmless, but not always. The pipeline drops GPS data by default, so a photo never says where I live.

## Cost

Nothing so far. R2's free tier includes 10 GB of storage and doesn't charge for downloads, and the site is static files on Cloudflare's free plan.

## What I'd change

The photos are still served from R2's development URL, which Cloudflare doesn't recommend for production. Moving them to a custom domain would add proper edge caching. Because the manifest stores full image URLs, that means regenerating it once. It's on the list.
