const nodemailer = require('nodemailer');
const log = console.log;

// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // TODO: your gmail account
        pass: process.env.PASSWORD  // TODO: your gmail password
    }
});


module.exports.sendEmail = function (obj) {
    console.log(obj);
    let html = '';
    let emailReceiver = '';
    if (obj['anonymous']) {
        emailReceiver = '';
        html = '<span id="goog_1438282657"></span><span id="goog_1438282658"></span><br />' +
            '<div style="text-align: center;">' +
            '<div class="separator" style="background-color: #e7f5fe; clear: both; text-align: center;">' +
            '<img border="0" data-original-height="150" data-original-width="687" height="138" src="https://1.bp.blogspot.com/-eilGTiRXO7s/XX8LTONZA3I/AAAAAAAARmA/P_0_2828Ug462uiMSjYvPvHoEV8jKPzmACLcBGAsYHQ/s640/Captura%2Bde%2Btela%2Bem%2B2019-09-15%2B23-15-46%2B%25281%2529.png" width="640" /></div>' +
            '<span style="font-size: large;"><b>Novo registro de denúncia:</b></span><br />' +
            '<div style="text-align: left;">' +
            '<b>        Tipo de Mensagem:</b><b style="font-size: x-large;"> </b><span>Anônima</span><br />' +
            '<b>        Denúncia:</b><b style="font-size: x-large;"> </b></div>' +
            '<div style="text-align: left;">' +
            '<b>                    Área Urbana: </b>' + (obj['urban'] ? 'Sim' : 'Não') + '<br />' +
            '<b>                    Motivo:</b><b> </b>' + obj['type'] + '<br />' +
            '                    <b>Descrição:</b><b> </b>' + obj['description'] + '<br />' +
            ((obj['urban']) ? '                    <b>Local:  </b>' + obj['place'] + ', N ' + obj['number'] + ' ' + obj['zone'] + '<br />' : '') +
            '<b>                    Ponto de Referência: </b>' + obj['reference'] + '<br />' +
            '                    <b>Google Maps:</b> <a href="https://www.google.com/maps/search/?api=1&query=' + obj['latitude'] + ',' + obj['longitude'] + '">Clique aqui ...</a><br />' +
            '<br />' +
            '        <br />' +
            '<b>        Foto do Local:</b><br />' +
            '<b><br /></b>' +
            '<br />' +
            '<div class="separator" style="clear: both; text-align: center;">' +
            '<b><img border="0" data-original-height="465" data-original-width="620" height="300" src="' + obj['url_img'] + '" width="400" /></b></div>' +
            '<div class="separator" style="clear: both; text-align: center;">' +
            '<b><br /></b></div>' +
            '<div class="separator" style="background-color: #effdff; clear: both; text-align: center;">' +
            '<b><img border="0" data-original-height="167" data-original-width="698" height="152" src="https://1.bp.blogspot.com/-g0_lkujzZSY/XX8GSP7i27I/AAAAAAAARl0/fgWGnmnF7Hclff2JoNTJLf9P8bAG5QvUACLcBGAsYHQ/s640/Captura%2Bde%2Btela%2Bem%2B2019-09-15%2B23-16-13.png" width="640" /></b></div>' +
            '<div class="separator" style="clear: both; text-align: center;">' +
            '<b><br /></b></div>' +
            '<br />' +
            '<b><br /></b></div>' +
            '</div>';
    } else {
        emailReceiver = obj['email'];
        html = '<span id="goog_1438282657"></span><span id="goog_1438282658"></span><br />' +
            '<div style="text-align: center;">' +
            '<div class="separator" style="background-color: #e7f5fe; clear: both; text-align: center;">' +
            '<img border="0" data-original-height="150" data-original-width="687" height="138" src="https://1.bp.blogspot.com/-eilGTiRXO7s/XX8LTONZA3I/AAAAAAAARmA/P_0_2828Ug462uiMSjYvPvHoEV8jKPzmACLcBGAsYHQ/s640/Captura%2Bde%2Btela%2Bem%2B2019-09-15%2B23-15-46%2B%25281%2529.png" width="640" /></div>' +
            '<span style="font-size: large;"><b>Novo registro de denúncia:</b></span><br />' +
            '<div style="text-align: left;">' +
            '<b>        Tipo de Mensagem:</b><b style="font-size: x-large;"> </b>Identificada</div>' +
            '<div style="text-align: left;">' +
            '        <b>Dados Contato:</b></div>' +
            '<div style="text-align: left;">' +
            '<b>                    Nome:</b><b> </b>' + obj['name'] + '</div>' +
            '<div style="text-align: left;">' +
            '<b>                    E-mail:</b><b> </b>' + obj['email'] + '</div>' +
            '<div style="text-align: left;">' +
            '<b>                    Telefone:</b><b> </b>' + obj['phone'] + '</div>' +
            '<div style="text-align: left;">' +
            '<b>        Denúncia:</b><b style="font-size: x-large;"> </b></div>' +
            '<div style="text-align: left;">' +
            '<b>                    Área Urbana: </b>' + (obj['urban'] ? 'Sim' : 'Não') + '<br />' +
            '<b>                    Motivo:</b><b> </b>' + obj['type'] + '<br />' +
            '                    <b>Descrição:</b><b> </b>' + obj['description'] + '<br />' +
            ((obj['urban']) ? '                    <b>Local:  </b>' + obj['place'] + ', N ' + obj['number'] + ' ' + obj['zone'] + '<br />' : '') +
            '<b>                    Ponto de Referência: </b>' + obj['reference'] + '<br />' +
            '                    <b>Google Maps:</b> <a href="https://www.google.com/maps/search/?api=1&query=' + obj['latitude'] + ',' + obj['longitude'] + '">Clique aqui ...</a><br />' +
            '<br />' +
            '        <br />' +
            '<b>        Foto do Local:</b><br />' +
            '<b><br /></b>' +
            '<br />' +
            '<div class="separator" style="clear: both; text-align: center;">' +
            '<b><img border="0" data-original-height="465" data-original-width="620" height="300" src="' + obj['url_img'] + '" width="400" /></b></div>' +
            '<div class="separator" style="clear: both; text-align: center;">' +
            '<b><br /></b></div>' +
            '<div class="separator" style="background-color: #effdff; clear: both; text-align: center;">' +
            '<b><img border="0" data-original-height="167" data-original-width="698" height="152" src="https://1.bp.blogspot.com/-g0_lkujzZSY/XX8GSP7i27I/AAAAAAAARl0/fgWGnmnF7Hclff2JoNTJLf9P8bAG5QvUACLcBGAsYHQ/s640/Captura%2Bde%2Btela%2Bem%2B2019-09-15%2B23-16-13.png" width="640" /></b></div>' +
            '<div class="separator" style="clear: both; text-align: center;">' +
            '<b><br /></b></div>' +
            '<br />' +
            '<b><br /></b></div>' +
            '</div>'

    }


    if (emailReceiver != '') {
        let mailOptionsPrivate = {
            from: 'app.ecocidadao@gmail.com', // TODO: email sender
            to: emailReceiver, // TODO: email receiver
            subject: 'Nova Denúncia Registrada',
            text: 'Denúncia',
            html: html
        };

        transporter.sendMail(mailOptionsPrivate, (err, data) => {
            if (err) {
                return log('Error occurs Private email');
            }
            console.log('Email Private sent!!');
        });
    }

    let mailOptions = {
        from: 'app.ecocidadao@gmail.com', // TODO: email sender
        to: ['deamb@tce.am.gov.br','app.ecocidadao@gmail.com'], // TODO: email receiver
        subject: 'Nova Denúncia Registrada',
        text: 'Denúncia',
        html: html
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return log('Error BROAD occurs', err);
        }
        return log('Email BROAD sent!!');
    });
}
