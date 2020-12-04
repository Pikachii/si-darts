<template>
  <svg viewBox="-500 -500 1000 1000" xmlns="http://www.w3.org/2000/svg">
    <text
      :x="460 * Math.cos((startRadian / 180) * Math.PI)"
      :y="460 * Math.sin((startRadian / 180) * Math.PI)"
      font-size="70"
      text-anchor="middle"
      dominant-baseline="central"
    >
      {{ number }}
    </text>
    <path
      :d="`M 0,0 L ${400 * Math.cos(((startRadian + 9) / 180) * Math.PI)},${
        400 * Math.sin(((startRadian + 9) / 180) * Math.PI)
      } a 400 400 0 0 0 ${
        400 *
        (Math.cos(((startRadian - 9) / 180) * Math.PI) -
          Math.cos(((startRadian + 9) / 180) * Math.PI))
      },${
        400 *
        (Math.sin(((startRadian - 9) / 180) * Math.PI) -
          Math.sin(((startRadian + 9) / 180) * Math.PI))
      } z`"
      :fill="doubleColor"
      stroke="black"
    />
    <path
      :d="`M 0,0 L ${370 * Math.cos(((startRadian + 9) / 180) * Math.PI)},${
        370 * Math.sin(((startRadian + 9) / 180) * Math.PI)
      } a 370 370 0 0 0 ${
        370 *
        (Math.cos(((startRadian - 9) / 180) * Math.PI) -
          Math.cos(((startRadian + 9) / 180) * Math.PI))
      },${
        370 *
        (Math.sin(((startRadian - 9) / 180) * Math.PI) -
          Math.sin(((startRadian + 9) / 180) * Math.PI))
      } z`"
      :fill="outerColor"
      stroke="black"
    />
    <path
      :d="`M 0,0 L ${240 * Math.cos(((startRadian + 9) / 180) * Math.PI)},${
        240 * Math.sin(((startRadian + 9) / 180) * Math.PI)
      } a 240 240 0 0 0 ${
        240 *
        (Math.cos(((startRadian - 9) / 180) * Math.PI) -
          Math.cos(((startRadian + 9) / 180) * Math.PI))
      },${
        240 *
        (Math.sin(((startRadian - 9) / 180) * Math.PI) -
          Math.sin(((startRadian + 9) / 180) * Math.PI))
      } z`"
      :fill="tripleColor"
      stroke="black"
    />
    <path
      :d="`M 0,0 L ${210 * Math.cos(((startRadian + 9) / 180) * Math.PI)},${
        210 * Math.sin(((startRadian + 9) / 180) * Math.PI)
      } a 210 210 0 0 0 ${
        210 *
        (Math.cos(((startRadian - 9) / 180) * Math.PI) -
          Math.cos(((startRadian + 9) / 180) * Math.PI))
      },${
        210 *
        (Math.sin(((startRadian - 9) / 180) * Math.PI) -
          Math.sin(((startRadian + 9) / 180) * Math.PI))
      } z`"
      :fill="innerColor"
      stroke="black"
    />
  </svg>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class SiDartsArea extends Vue {
  @Prop({ default: 0 })
  public readonly number!: number;
  @Prop({ default: 0 })
  public readonly startRadian!: number;
  @Prop({ default: 'red' })
  public readonly doubleColor!: string;
  @Prop({ default: 'red' })
  public readonly tripleColor!: string;
  @Prop({ default: 'black' })
  public readonly outerColor!: string;
  @Prop({ default: 'black' })
  public readonly innerColor!: string;
}
</script>
