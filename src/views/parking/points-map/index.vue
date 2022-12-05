<script lang="ts" setup>
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import { DrawEvent, DrawPoint } from '@antv/l7-draw'
import { Scene } from '@antv/l7'
import { Mapbox } from '@antv/l7-maps'
let mapRef: mapboxgl.Map | null = null
let sceneRef: Scene | null = null
let drawerRef: DrawPoint | null = null

const handleSave = () => {
  drawerRef?.disable()
}

const handleRefresh = () => {
  drawerRef?.disable()
}

const handleAddPoint = () => {
  drawerRef?.enable()
}

onMounted(async () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibGFuc2VyaWEiLCJhIjoiY2tzNDE4MDI0MHg5ZjJvcndtZzF4YTB6aCJ9.5k-y1Bx3km5MAOp4KVpb9g'
  mapRef = new mapboxgl.Map({
    container: 'map', // container-ID
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
  mapRef!.addControl(geoControl)
  mapRef!.addControl(new MapboxLanguage({ defaultLanguage: 'zh-Hans' }))
  mapRef!.on('click', (e: any) => {
    // console.log(e)
  })
  sceneRef = new Scene({
    id: 'map',
    map: new Mapbox({
      mapInstance: mapRef,
    }),
    logoVisible: false,
  })

  sceneRef!.on('loaded', () => {
    // const drawPoint = new DrawPoint(scene, {
    //   autoActive: false,
    // })
    // drawPointRef.value = drawPoint

    // setInterval(() => {
    //   console.log(scene!.getZoom(), scene!.getCenter())
    // }, 2000)

    //
    drawerRef = new DrawPoint(sceneRef!, {
      autoActive: false,
      // Draw 的配置 options
    })
    // 开启绘制
    drawerRef.disable()

    // 监听绘制事件
    drawerRef.on(DrawEvent.Change, (pointList) => {
      console.log(pointList)
    })
  })
})
onUnmounted(() => {
  sceneRef!.destroy()
})
</script>

<template>
  <LayoutContainer>
    <ASpace class="mb-5">
      <a-button type="outline" @click="handleSave()">
        保存
      </a-button>
      <a-button type="outline" @click="handleRefresh()">
        刷新
      </a-button>
      <a-button type="outline" @click="handleAddPoint()">
        添加点
      </a-button>
    </ASpace>
    <div
      id="map"
      class="relative h-[calc(100vh-300px)]"
    />
  </LayoutContainer>
</template>
