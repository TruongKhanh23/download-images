const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

// URL của ảnh mẫu
const urlTemplate = "https://picsum.photos/800/800";
const outputFolder = "./images/";

// Tạo thư mục lưu ảnh nếu chưa tồn tại
fs.ensureDirSync(outputFolder);

// Hàm tải ảnh
const downloadImage = async (index) => {
    try {
        const response = await axios({
            url: urlTemplate,
            method: 'GET',
            responseType: 'stream', // Để lưu ảnh dạng stream
        });
        const filePath = path.join(outputFolder, `image_${index}.jpg`);
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`Lỗi khi tải ảnh ${index}:`, error.message);
    }
};

// Tải 30 ảnh
const downloadImages = async () => {
    for (let i = 1; i <= 30; i++) {
        console.log(`Đang tải ảnh ${i}...`);
        await downloadImage(i);
    }
    console.log("Hoàn thành tải 30 ảnh!");
};

downloadImages();
