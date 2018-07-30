import os
import json
import argparse
from time import sleep
from urllib.request import (Request, urlopen, urlretrieve)

def main():
    imgs_folder = 'images'
    count = 1
    working_dir = os.getcwd()
    imgs_urls = [
        'https://www.reddit.com/r/trebuchetmemes.json?limit=100',
        'https://www.reddit.com/r/dankmemes.json?limit=100',
        'https://www.reddit.com/r/deepfriedmemes.json?limit=100',
        'https://www.reddit.com/r/OnlyWholesomeMemes.json?limit=100',
        'https://www.reddit.com/r/MemeEconomy.json?limit=100',
        'https://www.reddit.com/r/prequelmemes.json?limit=100',
        'https://www.reddit.com/r/sequelmemes.json?limit=100',
        'https://www.reddit.com/r/musicmemes.json?limit=100',
        'https://www.reddit.com/r/BikiniBottomTwitter.json?limit=100',
        'https://www.reddit.com/r/freefolk.json?limit=100',
        'https://www.reddit.com/r/historymemes.json?limit=100'
    ]
    for imgs_url in imgs_urls:
        req = Request(imgs_url)
        req.add_header('User-agent', 'Stylesheet images downloader Py3 v1')
        imgs_json = json.loads(urlopen(req).read())
        imgs = [i['data'] for i in imgs_json['data']['children'] if 'preview' in i['data'] and '.jpg' in i['data']['preview']['images'][0]['source']['url']]

        def fetch_images(total, count):
            if not os.path.exists(imgs_folder):
                os.makedirs(imgs_folder)
            os.chdir(imgs_folder)

            try:
                for i in imgs:
                    url = i['preview']['images'][0]['source']['url']
                    name = str(count) + '.jpg'
                    urlretrieve(url, name)
                    print("Downloading image " + str(count))
                    count += 1

            except Exception as e:
                print(e)
                print("Could not download images because error")
            
            os.chdir(working_dir)
            return count

        if imgs:
            total = len(imgs)
            count = fetch_images(total, count)
        else:
            print("No images found")
            break
if __name__ == "__main__":
    main()
