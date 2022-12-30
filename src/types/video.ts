namespace Video {
  export type Src = string
  export type Poster = string
  export type Paused = boolean
  export type Muted = boolean
  export type Duration = number
  export type CurrentTime = number
  export type Buffering = boolean
  export type Ended = boolean
  export type Loop = boolean
  export type Autoplay = boolean
  export type MetadataLoaded = boolean
}

export default Video

export interface VideoConfig {
  readonly autoplay: Video.Autoplay,
  /** muted autoplay if can't autoplay with sound */
  readonly forceAutoPlay: boolean,
  readonly objectFit: ObjectFit,
  readonly loop: Video.Loop
}