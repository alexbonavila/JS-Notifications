<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="onesignal">
    <h1>{{ title }}</h1>
    <div class="box box-primary direct-chat direct-chat-primary">
    <div class="box-header with-border">
    <h3 class="box-title">Send notifications</h3>

<div class="box-tools pull-right">
    <span data-toggle="tooltip" title="3 New Messages" class="badge bg-light-blue">{{ total }}</span>
<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
    </button>
    <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
    </div>
    </div>
    <!-- /.box-header -->
<div class="box-body">
    <!-- Conversations are loaded here -->
<div class="direct-chat-messages">

    <!-- Message. Default to the left -->

<div class="direct-chat-msg" v-for="notification in notifications">
    <div class="direct-chat-info clearfix">
    <span class="direct-chat-name pull-left">One Signal</span>
<span class="direct-chat-timestamp pull-right">{{ notification.date }}</span>
</div>
<!-- /.direct-chat-info -->
<img class="direct-chat-img" src="bower_components/AdminLTE/dist/img/user1-128x128.jpg" alt="Message User Image"><!-- /.direct-chat-img -->
<div class="direct-chat-text">
    {{ notification.message }}
<span class="pull-right">
    <button v-on:click="removeNotification(notification)" type="button" class="btn btn-box-tool"><i class="fa fa-minus"></i>
    </button>
    </span>
    </div>
    <!-- /.direct-chat-text -->
</div>


<!-- /.direct-chat-msg -->

<!-- /.direct-chat-msg -->
</div>
<!--/.direct-chat-messages-->

<!-- /.direct-chat-pane -->
</div>
<!-- /.box-body -->
<div class="box-footer">
    <div class="input-group">
    <input id="onesignal_message"
type="text"
autofocus autocomplete="off"
placeholder="What do you want to notify?"
v-model="newNotification"
@keyup.enter="addNotification"
class="form-control">
    <span class="input-group-btn">
    <button v-on:click="addNotification" type="button" class="btn btn-primary btn-flat">Send</button>
    <button v-on:click="clear" type="button" class="btn btn-danger btn-flat">Clear</button>
    </span>
    </div>
    </div>
    <!-- /.box-footer-->
</div>

<!--<h3>{{ notifications | json}}</h3>-->


</div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
export default {
    data: function () {
        return {
            // note: changing this line won't causes changes
            // with hot-reload because the reloaded component
            // preserves its current state and we are modifying
            // its initial state.
            title: 'Onesignal Recuperació',
            newNotification: '',
            notifications: notificationStorage.fetch()
        }
    },
    // computed properties
    // http://vuejs.org/guide/computed.html
    computed: {
        total: function () {
            return this.notifications.length;
        }
    },
    // watch todos change for localStorage persistence
    watch: {
        notifications: {
            handler: function (notifications) {
                notificationStorage.save(notifications);
            },
            deep: true
        }
    },
    methods: {
        addNotification: function() {
            var value = this.newNotification && this.newNotification.trim();
            if (!value) {
                return;
            }
            this.notifications.push({ message: value, date: moment().calendar()});
            this.newNotification= '';
            this.notifyWithAjax();
        },
        removeNotification: function (notification) {
            this.notifications.$remove(notification);
        },
        notifyWithAjax: function () {
            $.ajax({
                type: "POST",
                url: "https://onesignal.com/api/v1/notifications?app_id=521c1f5e-ada1-4a57-9c11-90cd71099d8a",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic OTczZjhmMjQtMGU4Yy00ZWNhLThhZWUtNGJlYjdmY2QzNjll'),
                        xhr.setRequestHeader('Content-Type', 'application/json')
                },
                data: JSON.stringify({
                    "app_id": "521c1f5e-ada1-4a57-9c11-90cd71099d8a",
                    "included_segments": ["All"],
                    "data": {"foo": "bar"},
                    "content_available":true,
                    "contents": {"en": this.newNotification,"es": this.newNotification},
                    "headings": {"en": this.newNotification,"es": this.newNotification},
                    "isAndroid": true,
                    "android_sound": "notification",
                    "android_led_color": "FF0000FF",
                    "android_visibility": 1
                }),
                dataType: "json"
            }).done(function(data) {
                console.log(data);
            });
        },
        clear: function () {
            console.debug('ADSSDAASDASD');
            this.notifications = [];
            notificationStorage.save([]);
        },
        notifyNotWorking: function () {
            //NOT WORKING PUSHWOOSH NOT IMPLEMENTING CORS?
            var $message = $('#onesignal_message').val();
            console.debug($message);
            var $data = JSON.stringify({
                "request": {
                    "application": "4FC89B6D14A655.46488481",
                    "auth": "mTdns0j6qLYPa/A5htmD46xVyoxdVQfPBz7NRqYYHz9PhvKXgJtOkAY+yo0YTXDEoztQAJFY0JmXnd89tf59",
                    "notifications": [{
                        "send_date": "now",
                        "ignore_user_timezone": true,
                        "content": $message
                    }]
                }
            });
            console.debug($data);
            Vue.http.get('https://cp.pushwoosh.com/json/1.3/createMessage',$data).then(this.successCallback, this.errorCallback);
        },
        successCallback: function () {
            console.debug('SUCCESS');
        },
        errorCallback: function (response) {
            console.debug('ERROR');
            console.debug(response.status);
        }
    }
}
</script>