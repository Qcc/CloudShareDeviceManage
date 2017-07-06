var data = {
		ming_cheng: 'a'
}
$.ajax({
    type: 'POST',
    url: "http://localhost:8080/CloudShareDeviceManager/public/huoban/create.api",
    data: data,
    crossDomain: true,
    error: function (err) {
        console.dir(err);
        console.dir("失败");
    },
    success: function (resp) {
        console.dir(resp);
        if(resp.errorCode == 0 && resp.entity && resp.entity.uid != null)
        	console.dir("成功");
        else
        	console.dir("失败");
    }
});

var data = {
		state:1, 
		password: 'b', 
		account: 'a',
		huobanuid: 1
}
$.ajax({
    type: 'POST',
    url: "http://localhost:8080/CloudShareDeviceManager/public/user/create.api",
    data: data,
    crossDomain: true,
    error: function (err) {
        console.dir(err);
        console.dir("失败");
    },
    success: function (resp) {
        console.dir(resp);
        if(resp.errorCode == 0 && resp.entity && resp.entity.uid != null)
        	console.dir("成功");
        else
        	console.dir("失败");
    }
});

var data = {
		uid:1, 
		password: 'a'
}
$.ajax({
    type: 'POST',
    url: "http://localhost:8080/CloudShareDeviceManager/public/user/update.api",
    data: data,
    crossDomain: true,
    error: function (err) {
        console.dir(err);
        console.dir("失败");
    },
    success: function (resp) {
        console.dir(resp);
        if(resp.errorCode == 0 && resp.entity == 1)
        	console.dir("成功");
        else
        	console.dir("失败");
    }
});

var data = {
		entity: {
			account: 'b', 
			password: 'b'	
		},
		condition: {
			account: 'a', 
			password: 'a'	
		}		
}
$.ajax({
    type: 'POST',
    url: "http://localhost:8080/CloudShareDeviceManager/public/user/updateByCondition.api",
    data: JSON.stringify(data),
    contentType: 'application/json;charset=utf-8',
    crossDomain: true,
    error: function (err) {
        console.dir(err);
        console.dir("失败");
    },
    success: function (resp) {
        console.dir(resp);
        if(resp.errorCode == 0 && resp.entity == 1)
        	console.dir("成功");
        else
        	console.dir("失败");
    }
});

var data = {
		ifJoinReference: true,
		account: 'b',
		'huoban.ming_cheng': 'a'
}
$.ajax({
    type: 'POST',
    url: "http://localhost:8080/CloudShareDeviceManager/public/user/read.api",
    data: data,
    crossDomain: true,
    error: function (err) {
        console.dir(err);
        console.dir("失败");
    },
    success: function (resp) {
        console.dir(resp);
        if(resp.errorCode == 0)
        	console.dir("成功");
        else
        	console.dir("失败");
    }
});

var data = {
		uid: 1
}
$.ajax({
    type: 'POST',
    url: "http://localhost:8080/CloudShareDeviceManager/public/user/delete.api",
    data: data,
    crossDomain: true,
    error: function (err) {
        console.dir(err);
        console.dir("失败");
    },
    success: function (resp) {
        console.dir(resp);
        if(resp.errorCode == 0)
        	console.dir("成功");
        else
        	console.dir("失败");
    }
});

var data = {
		ifGetCount: true,
		ifGetColumns: true,
		ifJoinReference: true,
		condition: {
			account: 'b',
            gongsi:{
                name:'xxx'
            }
		},
		fuzzySearchKeyword: 'a',
		sorter: {
			accountDirection: 'ASC',
			passwordDirection: 'ASC',
			huobansorter: {
				ming_chengDirection: 'DESC',
				dizhiDirection: 'ASC'
			}
		}
}
$.ajax({
    type: 'POST',
    url: "http://localhost:8080/CloudShareDeviceManager/public/user/getPager.api",
    data: JSON.stringify(data),
    contentType: 'application/json;charset=utf-8',
    crossDomain: true,
    error: function (err) {
        console.dir(err);
        console.dir("失败");
    },
    success: function (resp) {
        console.dir(resp);
        if(resp.errorCode == 0)
        	console.dir("成功");
    }
});

var data = {
		ifGetCount: true,
		ifGetColumns: true,
		ifJoinReference: true,
		condition: {
			account: 'b'
		},
		fuzzySearchKeyword: 'a',
		sorter: {
			accountDirection: 'ASC',
			passwordDirection: 'ASC',
			huobansorter: {
				ming_chengDirection: 'DESC',
				dizhiDirection: 'ASC'
			}
		}
}
$.ajax({
    type: 'POST',
    url: "http://localhost:8080/CloudShareDeviceManager/public/user/getPager.api",
    data: JSON.stringify(data),
    contentType: 'application/json;charset=utf-8',
    crossDomain: true,
    error: function (err) {
        console.dir(err);
        console.dir("失败");
    },
    success: function (resp) {
        console.dir(resp);
        if(resp.errorCode == 0)
        	console.dir("成功");
    }
});