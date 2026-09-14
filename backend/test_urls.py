import urllib.request

urls = [
    "https://res.cloudinary.com/wlxqjvu9/image/upload/v1/media/products/Chakson_alm_4L_exv4c6",
    "https://res.cloudinary.com/wlxqjvu9/image/upload/v1/media/products/Chakson_alm_4L_exv4c6.jpg"
]

for url in urls:
    print(f"Fetching: {url}")
    try:
        req = urllib.request.Request(url, method='HEAD')
        resp = urllib.request.urlopen(req)
        print(f"Status: {resp.status}")
    except Exception as e:
        print(f"Error: {e}")
    print("-" * 40)
