<script lang="ts" setup>
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
// import AMapLoader from '@amap/amap-jsapi-loader'
import { LayerPopup, PointLayer, Scene } from '@antv/l7'
import { Mapbox } from '@antv/l7-maps'
import { querySamplePointMap } from '~/api/sample'
const mapRef = shallowRef<mapboxgl.Map>()
const sceneRef = shallowRef<Scene>()

let samplePointData: any[] = []

const fetchData = async () => {
  const res = await querySamplePointMap()
  samplePointData = res.data
}

const loadPointText = () => {
  const pointLayer = new PointLayer({})
    .source(samplePointData)
    .shape('orgName', 'text')
    .size(8)
    .style({
      opacity: 0.5,
      textAnchor: 'top', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
      textOffset: [0, 10], // 文本相对锚点的偏移量 [水平, 垂直]
      spacing: 2, // 字符间距
      padding: [1, 1], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
      stroke: '#ffffff', // 描边颜色
      strokeWidth: 0.3, // 描边宽度
      strokeOpacity: 1.0,
    })

  sceneRef.value && sceneRef.value.addLayer(pointLayer)
}

const loadPointPopup = () => {
  const pointLayer = new PointLayer({})
    .source(samplePointData)
    .shape('circle')
    .size(5)
    .color('#5B8FF9')
    .active(true)
    .style({
      opacity: 0.3,
      strokeWidth: 1,
    })

  sceneRef.value && sceneRef.value.addLayer(pointLayer)

  const layerPopup = new LayerPopup({
    className: 'text-dark',
    trigger: 'click',
    items: [
      {
        layer: pointLayer,
        fields: [
          {
            field: 'orgName',
            formatField: () => '名称',
          }, {
            field: 'workTime',
            formatField: () => '工作时间',
          },
        ],
      },
    ],
  })

  sceneRef.value && sceneRef.value.addPopup(layerPopup)
}

onMounted(async () => {
  await fetchData()
  mapboxgl.accessToken = 'pk.eyJ1IjoibGFuc2VyaWEiLCJhIjoiY2tzNDE4MDI0MHg5ZjJvcndtZzF4YTB6aCJ9.5k-y1Bx3km5MAOp4KVpb9g'
  mapRef.value = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/lanseria/cl2ipj7ar004z14nv9lgrdb2d', // style URL
    center: [122.16327998508143, 30.002517329286277], // starting position [lng, lat]
    zoom: 9, // starting zoom
  })
  const geoControl = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
  })
  mapRef.value.addControl(geoControl)
  mapRef.value.addControl(new MapboxLanguage({ defaultLanguage: 'zh-Hans' }))
  mapRef.value.on('click', (e: any) => {
    console.log(e)
  })
  // AMapLoader.load({
  //   key: '8b04f44c5945851dabd1c8ae50a24a55',
  //   version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  //   plugins: ['AMap.ToolBar', 'AMap.Driving'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  // }).then((GaodeAMap) => {
  //   map.value = new GaodeAMap.Map('map', { // 设置地图容器id
  //     viewMode: '2D', // 是否为3D地图模式
  //     zoom: 5, // 初始化地图级别
  //     center: [105.602725, 37.076636], // 初始化地图中心点位置
  //   })
  // })
  // const L7AMap = new GaodeMapV2({
  //   pitch: 35.210526315789465,
  //   style: 'dark',
  //   center: [104.288144, 31.239692],
  //   zoom: 4.4,
  //   token: '8b04f44c5945851dabd1c8ae50a24a55',
  //   plugin: ['AMap.ToolBar', 'AMap.LineSearch'],
  // })
  // const scene = new Scene({
  //   id: 'map',
  //   map: L7AMap,
  // })
  sceneRef.value = new Scene({
    id: 'map',
    map: new Mapbox({
      mapInstance: mapRef.value,
    }),
  })
  sceneRef.value.on('loaded', () => {
    loadPointText()
    loadPointPopup()
  })
})
onUnmounted(() => {
  mapRef.value && mapRef.value.remove()
})
</script>

<template>
  <LayoutContainer>
    <div
      id="map"
      class="relative h-[calc(100vh-300px)]"
    />
  </LayoutContainer>
</template>
