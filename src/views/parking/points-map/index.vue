<script lang="ts" setup>
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import { ControlEvent, DrawControl, DrawEvent, DrawPoint } from '@antv/l7-draw'
import { Scene } from '@antv/l7'
import { Mapbox } from '@antv/l7-maps'
let mapRef: mapboxgl.Map | null = null
let sceneRef: Scene | null = null
let drawControlRef: DrawControl | null = null

const visible = ref(false)

const handleShowStatus = () => {
  if (drawControlRef)
    drawControlRef.hide()
}

const handleEditStatus = () => {
  if (drawControlRef) {
    drawControlRef.show()
  }
  else {
    // 实例化 DrawControl 实例
    const drawControl = new DrawControl(sceneRef!, {
    // DrawControl 参数
      position: 'topcenter',
      commonDrawOptions: {
        editable: true,
        multiple: false,
      },
    })
    drawControlRef = drawControl
    // 将 Control 添加至地图中
    sceneRef!.addControl(drawControl)
    drawControlRef.on(ControlEvent.DrawChange, (newType) => {
      console.log('当前激活的绘制发生更改', newType)
    })

    drawControlRef.on(ControlEvent.DataChange, (newData) => {
      console.log('当前绘制数据发生更改', newData)
      visible.value = true
      // drawControlRef!.setActiveType(null)
    })
  }
}

const handleOk = () => {
  visible.value = false
}

const handleCancel = () => {
  visible.value = false
}

onMounted(async () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibGFuc2VyaWEiLCJhIjoiY2tzNDE4MDI0MHg5ZjJvcndtZzF4YTB6aCJ9.5k-y1Bx3km5MAOp4KVpb9g'
  mapRef = new mapboxgl.Map({
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
  })
})
onUnmounted(() => {
  sceneRef!.destroy()
})
</script>

<template>
  <LayoutContainer>
    <div
      id="map"
      class="relative h-[calc(100vh-300px)]"
    >
      <ASpace class="absolute top-10px left-10px z-100">
        <a-button type="outline" @click="handleShowStatus()">
          查看地图
        </a-button>
        <a-button type="outline" @click="handleEditStatus()">
          编辑地图
        </a-button>
      </ASpace>
      <ADrawer
        popup-container="#map"
        :height="200"
        :mask="false"
        :mask-closable="false"
        :visible="visible"
        placement="bottom"
        unmount-on-close
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <template #title>
          Title
        </template>
        <div>You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button.</div>
      </ADrawer>
    </div>
  </LayoutContainer>
</template>
