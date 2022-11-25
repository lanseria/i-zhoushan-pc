<script lang="ts" setup>
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import type { LayerPopup } from '@antv/l7'
import { PointLayer, Popup, Scene } from '@antv/l7'
import { Mapbox } from '@antv/l7-maps'
import { debounce } from 'lodash-es'
import { querySamplePointMap } from '~/api/sample'

const mapRef = shallowRef<mapboxgl.Map>()
const sceneRef = shallowRef<Scene>()
const popupLayerRef = shallowRef<LayerPopup>()

let samplePointData: any[] = []

const fetchData = async (params: any) => {
  const res = await querySamplePointMap(params)
  samplePointData = res.data
}

const loadPointText = () => {
  const layer = new PointLayer({ })
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
  sceneRef.value && sceneRef.value.addLayer(layer)
}

const loadPointCircle = () => {
  const layer = new PointLayer({})
    .source(samplePointData)
    .shape('circle')
    .size(5)
    .color('serviceStatus', (value) => {
      // ['#ef503c', '#e6a23c', '#2f9c0a', '#557c7d']
      switch (value) {
        case 0:
          return '#C24740'
        case 1:
          return '#F3AE1A'
        case 2:
          return '#50C240'
        case 3:
          return '#BEBEBE'
        default:
          return '#BEBEBE'
      }
    })
    .active(true)
    .style({
      opacity: 0.3,
      strokeWidth: 1,
    })
  layer.on('click', (e) => {
    const popup = new Popup(
      {
        lngLat: e.lngLat,
        title: e.feature.properties.areaName,
        html: `<p>${e.feature.properties.workTime}</p>`,

      })
    popup.getIsShow() ? popup.hide() : popup.show()
    sceneRef.value!.addPopup(popup)
  })
  sceneRef.value && sceneRef.value.addLayer(layer)
}

const handleBounds = async () => {
  popupLayerRef.value && popupLayerRef.value.hide()
  sceneRef.value && sceneRef.value.removeAllLayer()
  const bounds = mapRef.value?.getBounds()
  await fetchData(bounds)
  loadPointText()
  loadPointCircle()
}

// const debounceBounds = () => {
//   return
// }

onMounted(async () => {
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
    // console.log(e)
  })
  const scene = new Scene({
    id: 'map',
    map: new Mapbox({
      mapInstance: mapRef.value,
    }),
    logoVisible: false,
  })
  sceneRef.value = scene
  scene.on('zoomend', debounce(handleBounds, 3000))
  scene.on('moveend', debounce(handleBounds, 3000))
  scene.on('loaded', handleBounds)
})
onUnmounted(() => {
  sceneRef.value?.destroy()
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
