myApp.views = {
    homePage: {
        render: function(page) {
            var point = myApp.models.user.getPoint();
            var today_point = myApp.models.user.getTodayPoint();
            var multiplier = myApp.models.user.getMultiplier();
            var hour = new Date().getHours();

            page.querySelector('#field-level').innerHTML = Math.floor(point / 10);
            page.querySelector('#field-exp').value = point % 10 * 10;
            page.querySelector('#field-total-point').innerHTML = point;
            page.querySelector('#field-total-today').innerHTML = today_point;

            //Rendering Achievement Icon (badge)
            if (point < 500) {
                page.querySelector('#field-icon-achievement').setAttribute("icon", "ion-university");
            } else if (point < 1000) {
                page.querySelector('#field-icon-achievement').setAttribute("icon", "ion-ribbon-a");
            } else {
                page.querySelector('#field-icon-achievement').setAttribute("icon", "ion-trophy");
            }

            //Rendering Stamina Icon
            var iconStamina = page.querySelector('#field-icon-stamina');
            if (hour >= 23) {
                iconStamina.setAttribute("icon", "ion-battery-empty");
            } else if (hour >= 18) {
                iconStamina.setAttribute("icon", "ion-battery-low");
            } else if (hour >= 13) {
                iconStamina.setAttribute("icon", "ion-battery-half");
            } else if (hour >= 7) {
                iconStamina.setAttribute("icon", "ion-battery-full");
            } else {
                iconStamina.setAttribute("icon", "ion-battery-charging");
            }

            //Rendering Multiplier Icon
            var iconMultiplier = page.querySelector('#field-icon-multiplier');
            if (multiplier == 1) {
                iconMultiplier.setAttribute("icon", "ion-volume-low");
            } else if (multiplier == 2) {
                iconMultiplier.setAttribute("icon", "ion-volume-medium");
            } else {
                iconMultiplier.setAttribute("icon", "ion-volume-high");
            }
        }
    },

    settingsPage: {
        render: function(page) {
            var point = myApp.models.user.getPoint();
            document.querySelector('#btn-prompt-point .right').innerHTML = point;
        }
    }
}
