#!/usr/bin/env bash

set -ex

for post in $(ls _posts); do
    echo $post
    for img in $(grep "sinaimg" _posts/$post | awk 'match($0, /https:.*sinaimg.*(jpg|gif|png)/) { print substr($0, RSTART, RLENGTH )}'); do
        echo $img
        # download image and upload to oss
        imageName=$(basename $img)
        # wget $img && ossutil -c ~/.ossutil-blog-config cp ./${imageName} oss://cizixs-blog/${imageName}

        # get oss-url, and do inplace update
        imageOssUrl=https://cizixs-blog.oss-cn-beijing.aliyuncs.com/${imageName}
        echo $imageOssUrl
        sed -i "" "s#$img#$imageOssUrl#" _posts/$post
    done
done
