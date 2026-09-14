import os
os.environ["CLOUDINARY_URL"] = "cloudinary://841695197426834:ofuH4zCbfzIIbjQkFOxU8D8psXM@wlxqjvu9"
import cloudinary
import cloudinary.uploader

media_dir = os.path.join('media', 'products')

if not os.path.exists(media_dir):
    print("No media/products directory found.")
else:
    for filename in os.listdir(media_dir):
        file_path = os.path.join(media_dir, filename)
        if os.path.isfile(file_path):
            public_id = f"media/products/{os.path.splitext(filename)[0]}"
            print(f"Uploading {filename} to Cloudinary as {public_id}...")
            # We must use use_filename=True and unique_filename=False to match Django's exact paths
            # Actually, django-cloudinary-storage stores the extension in the db too!
            # The public ID in cloudinary should just be the path without extension, or WITH extension depending on settings.
            # Let's upload keeping the exact same structure django-cloudinary-storage expects.
            # django-cloudinary-storage uploads files using: public_id = products/filename_without_ext
            try:
                cloudinary.uploader.upload(
                    file_path, 
                    public_id=public_id,
                    unique_filename=False,
                    overwrite=True,
                    resource_type="image"
                )
                print(f"Success: {filename}")
            except Exception as e:
                print(f"Failed {filename}: {e}")
    print("All done!")
