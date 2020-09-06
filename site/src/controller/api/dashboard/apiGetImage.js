const fs = require('fs');
const path = require('path');

const imageController = {
    async  getImage (req, res) {
        const type = req.params.type;
        const name = req.params.name;
    
        // para encontrar la ubicación de la imagen
        //type si es receta o planes
        //
        const pathImage = path.resolve(__dirname, `../../../../public/img/${type}/${name}`);
        console.log(pathImage);

        if (fs.existsSync(pathImage)){
            res.sendFile(pathImage)
        }else{
            const pahtNoImage = path.resolve(__dirname, '../../../../public/img/default/notImage.png');
            console.log(pahtNoImage);
            res.sendFile(pahtNoImage)
        }
    }

};
module.exports = imageController;