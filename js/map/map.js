console.info("map.js")


//지도객체 네임스페이스
var MAP={

        //geoserverUrl:'http://192.168.0.2:8080/geoserver',
        geoserverUrl:'http://geonpf.iptime.org:60011/geoserver',
        geoserver_workspace:'lx_danger_area',//지오서버 데이터 요청시 papth 1depth
        //geoserverUrl:'http://geonworks.iptime.org:20004/geoserver',//rcic지오서버(개발)
        vworldKey : "4890FF6A-0D07-303B-AFD7-86034DB3D247",
        _map : {},//전역 ol 맵 객체
        ///전역 레이ㅓ 정의
        layers:{
                  baseLayers:{},
                  wmsLayers:{},
                  wfsLayers:{}
        },//ol map 객체에 포함될 레이어들을 저장하는 객체, baselayer,wms, wfs 등등

        mapView :{},//mapView

        airImgWinRef:null,

        createMapClass: function() {
                console.info("CREATE MAP CLASS");
                // 기본이 될 Layer 저장
                // 레이어 (단일 또는 다중)
                this.layers.baseLayers={}
                this.layers.baseLayers["VWorld"] = new ol.layer.Tile({
                  title: "VWorld Gray Map",
                  visible: true,
                  id: "VWorld",
                  type: "base",
                  source: new ol.source.XYZ({
                    url: "http://api.vworld.kr/req/wmts/1.0.0/"+this.vworldKey+"/Base/{z}/{y}/{x}.png",
                    crossOrigin: "anonymous",
                  }),
                }),

                this.layers.baseLayers["OSM"] = new ol.layer.Tile({
                      source: new ol.source.OSM(),

               });

                /* ========================================================================== */
                /* =========================지오서버레이어================================================= */


                 /* =========================지오서버레이어================================================= */

                // 지도그리기
                this.mapView = new ol.View({
                    center: [14151646.114382012, 4497700.055161816],//5174
                    //center: [952903.5895988757, 1952229.2979214708],//5179
                    zoom: 14,
                    minZoom: 7,
                    maxZoom: 18
                    ,projection : 'EPSG:5179'
                });


                // 기본지도 그리기
                this._map = new ol.Map({
                    target: 'map',
                     layers :[
                                  // baseLayers['VWorld'], tmprVectorLayer
                                  //baseLayers를 제외하고 융합정보 나열시 CheckBox랑 순서 똑같이 맞춰야됨
                                  this.layers.baseLayers['OSM']//, this.wmsLayer
                              ],
                    overlays: [],
                    view: this.mapView
                    //,controls: ol.control.defaults({ attributionOptions: { collapsible: true } })
                    //.extend([new ol.control.ZoomToExtent({ extent: [13599573.582313137, 4044710.672790877, 14753466.961306157, 4621963.110400528] })])
                    //.extend([new ol.control.FullScreen()])
                });





        },


        addBaseTileLayer: function(layerNm) {
                this._map.getLayers().clear();
                console.info(this.layers.baseLayers);

                this._map.addLayer(this.layers.baseLayers[layerNm]);


                //성남 서현역 epsg 3857
                //his._map.getView().setCenter([14151760.769924419, 4492177.479868216]);
                //서울시청 epsg 3857
                //this._map.getView().setCenter([14135136.120264426, 4518353.625482665]);
                //서울시청 epsg 5174
                //this._map.getView().setCenter([198003.10465620566, 451588.32130529406]);
                //성남 서현역 epsg 5179
                this._map.getView().setCenter([966715.3202278443, 1931764.6642554018]);
                //서울 마포 용산쪽  epsg 5179
                //this._map.getView().setCenter([952903.5895988757, 1952229.2979214708]);
                //서울 시청  epsg 5186
                //this._map.getView().setCenter([198082.76597843564, 551903.6850339735]);
                //서울 시청  epsg 4326
                //this._map.getView().setCenter([126.97831737391309, 37.566619172927574]);


                //wms 레이어 클릭 이벤트
                this._map.on('singleclick', function(evt) {
                         console.info("singleclick")
                         MAP.getAirialImgFiles(evt);

                    })

        }


}











$(function(){

        console.info("mapinit")
        console.info("crsProj4 reg..");
        var crsVal5174=crsUtil.getProj4("EPSG:5174");
        console.info(crsVal5174);
        proj4.defs('EPSG:5174',crsVal5174);

        var crsVal5179=crsUtil.getProj4("EPSG:5179");
        console.info(crsVal5179);
        proj4.defs('EPSG:5179',crsVal5179);

        var crsVal5186=crsUtil.getProj4("EPSG:5186");
        console.info(crsVal5186);
        proj4.defs('EPSG:5186',crsVal5186);

        //ol 지도 객체 생성
        MAP.createMapClass();
        MAP.addBaseTileLayer('VWorld');
        //MAP.addBaseTileLayer('OSM');
        //가로레이어 레이어 생성후 전역레이어리스트에추가 후 지도에 레이어 add

        //순서대로 layer 순서 적용
        LAYER.addWmsImgLayer("lx_danger_area:tl_sprd_manage5179",false);
        LAYER.addWmsImgLayer("lx_danger_area:accident_risk5179",false);
        LAYER.addWmsImgLayer("lx_danger_area:freezing_risk5179",false);






});







