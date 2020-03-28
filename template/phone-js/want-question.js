define([], function () {
    // controller
    return ["$scope", "$state", function ($scope, $state) {
        if(arrayImg){
            console.log("初始化图片数组：arrayImg")
            arrayImg = [];
        }
        $scope.now = new Date().Format("yyyy-MM-dd hh:mm:ss");
        $scope.problemFollow = 0;
        $scope.uploadImg = function () {
            var count = document.getElementById("shuliang").innerText * 1;
            if (count < 3) {
                document.getElementById("fileUpload").click();
            }
        }

        $scope.weiguan = function () {
            var ev = document.getElementById("wieguan");
            console.log(ev)
            if (ev.src.indexOf("hui") != -1) {
                // TODO 弹出提示
                document.getElementById("myAlert").style.display = "block";
            } else {
                ev.src = "img/checkbox-hui.png";
                $scope.problemFollow = 0;
            }
        }

        $scope.confirm = function () {
            document.getElementById("wieguan").src = "img/checkbox-act.png";
            document.getElementById("myAlert").style.display = "none";
            $scope.problemFollow = 1;
        }

        $scope.submit = function () {
            if (isUserLogin()) {
                if (!$scope.problemTitle) {
                    _successMsg("问题标题不允许为空！");
                } else if (!$scope.problemRemark) {
                    _successMsg("请输入问题描述！");
                } else {
                    if (ISWXWEB){
                        _post({
                            url: STUDY_API + "/problem/createProblem",
                            param: {
                                problemTitle: $scope.problemTitle,
                                problemRemark: $scope.problemRemark,
                                problemImgs: $("#problemImgs").val(),
                                problemFollow: $scope.problemFollow,
                                client: '2',
                                code: localStorage.getItem("code"),
                            },
                            callback: function (res) {
                                console.log('支付返回结果：', res)
                                if(res.code == '2000'){
                                    var wxRes = JSON.parse(res.data.qrcode);
                                    wxPay(wxRes);
                                }
                            }
                        });
                    } else {
                        _post({
                            url: STUDY_API + "/problem/createProblem",
                            param: {
                                problemTitle: $scope.problemTitle,
                                problemRemark: $scope.problemRemark,
                                problemImgs: $("#problemImgs").val(),
                                problemFollow: $scope.problemFollow,
                                client: '0'
                            },
                            callback: function (res) {
                                if (res.code == '2000') {
                                    var data = res.data;
                                    console.log("提问返回数据:", data);
                                    location.href = data.qrcode;
    //                                $state.go("phone-question");
                                }
                            }
                        })
                    } 
                }
                return;
            } else {
                $state.go("phone-login")
            }
        }

        Array.prototype.remove = function(val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };

        $scope.deleteImg = function(index){
            console.log("删除某个元素",index);
            if(index == 0){
                arrayImg.remove(document.getElementById("img11").src)
                document.getElementById("img11").src = ""
                document.getElementById("bt11").style.display = "none"
            }
            if(index == 1){
                arrayImg.remove(document.getElementById("img22").src)
                document.getElementById("img22").src = ""
                document.getElementById("bt22").style.display = "none"
            }
            if(index == 2){
                arrayImg.remove(document.getElementById("img33").src)
                document.getElementById("img33").src = ""
                document.getElementById("bt33").style.display = "none"
            }
            var count = document.getElementById("shuliang").innerText * 1;
            count--;
            document.getElementById("shuliang").innerText = count;
        }
    }]
})

var arrayImg = [];

function selectImg($event) {
    console.log($event)
    var file = $event.files[0];
    lrz(file, {width: 450, quality: 0.7}).then(function (resFile) {
        var param = {};
        param['fileName'] = resFile.base64;
        param['fileType'] = "image/jpeg";
        _post({
            url: BASIS_API + '/upload/uploadFile',
            param: param,
            callback: (res) => {
                if (res.code == '2000') {
                    let data = res.data;
                    arrayImg.push(data.fileRoot + "/" + data.filePath)
                    $("#problemImgs").val(arrayImg.join(","));
                    var count = document.getElementById("shuliang").innerText * 1;
                    count++;
                    document.getElementById("shuliang").innerText = count;
                   for (var i=0; i<arrayImg.length; i++){
                       if (i==0){
                           document.getElementById("img11").src = arrayImg[i]
                           document.getElementById("bt11").style.display = "block"
                       }
                       if (i==1){
                           document.getElementById("img22").src = arrayImg[i]
                           document.getElementById("bt22").style.display = "block"
                       }
                       if (i==2){
                           document.getElementById("img33").src = arrayImg[i]
                           document.getElementById("bt33").style.display = "block"
                       }
                   }
                }
            }
        });
    });
}

