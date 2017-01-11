myApp.controllers = {
    menuPage: function(page) {
        function bindPage(buttonId, target) {
            document.getElementById(buttonId).onclick = function() {
                var content = document.getElementById('content');
                var menu = document.getElementById('menu');
                content.load(target).then(menu.close.bind(menu));
            };
        }

        bindPage('menu-home', 'html/home.html');
        bindPage('menu-time-challenge', 'html/time_challenge.html');
        bindPage('menu-settings', 'html/settings.html');
    },

    homePage: function(page) {
        page.querySelector('#btn-splitter-toggle').onclick = function() {
            document.querySelector('#mySplitter').left.toggle();
        };

        page.querySelector('#btn-increase-point').onclick = function() {
            var changeAmount = 1 * myApp.models.user.getMultiplier();
            myApp.models.user.increasePoint(changeAmount);
            myApp.views.homePage.render(page);
        };

        page.querySelector('#btn-decrease-point').onclick = function() {
            var changeAmount = -1;
            myApp.models.user.increasePoint(changeAmount);
            myApp.views.homePage.render(page);
        };

        page.querySelector('#btn-increase-multiplier').onclick = function() {
            var original = parseInt(myApp.models.user.getMultiplier());
            var result = original + 1;
            if (result > 3){
                result = 3;
            }
            myApp.models.user.setMultiplier(result);
            myApp.views.homePage.render(page);
        };

        page.querySelector('#btn-decrease-multiplier').onclick = function() {
            var original = parseInt(myApp.models.user.getMultiplier());
            var result = original - 1;
            if (result < 1){
                result = 1;
            }
            myApp.models.user.setMultiplier(result);
            myApp.views.homePage.render(page);
        };

        myApp.views.homePage.render(page);
    },

    timeChallengePage: function(page) {
        page.querySelector('#btn-splitter-toggle').onclick = function() {
            document.querySelector('#mySplitter').left.toggle();
        };

        page.querySelector('#btn-challenge-start').onclick = function() {
            //TODO Add validation logic
            var taskName = page.querySelector('#input-text-taskname').value;
            var duration = page.querySelector('#input-text-duration').value;
            var reward = page.querySelector('#input-text-reward').value;
            var endTime = moment().add(parseInt(duration), 'm');
            myApp.models.timeChallenge.on(endTime, parseInt(reward), taskName);
            myApp.views.timeChallengePage.render(page);
        };

        page.querySelector('#btn-challenge-complete').onclick = function() {
            var challenge_data = myApp.models.timeChallenge.getData();
            var reward = parseInt(challenge_data.reward_point);
            myApp.models.user.increasePoint(reward);
            myApp.models.timeChallenge.off();
            myApp.views.timeChallengePage.render(page);
        };

        page.querySelector('#btn-challenge-abandon').onclick = function() {
            myApp.models.timeChallenge.off();
            myApp.views.timeChallengePage.render(page);
        };

        myApp.views.timeChallengePage.render(page);
    },

    settingsPage: function(page) {
        page.querySelector('#btn-splitter-toggle').onclick = function() {
            document.querySelector('#mySplitter').left.toggle();
        };

        function bindPromptToData(promptBtnId, storageKey) {
            document.getElementById(promptBtnId).onclick = function() {
                ons.notification.prompt({message: 'New Value'})
                .then(function(value) {
                    if (isNaN(parseInt(value))) {
                        ons.notification.alert('The value must be an integer');
                    } else {
                        myApp.models.set(storageKey, parseInt(value));
                    }
                    myApp.views.settingsPage.render(page);
                });
            };
        }

        bindPromptToData('btn-prompt-point', 'point');
        myApp.views.settingsPage.render(page);
    }

};
