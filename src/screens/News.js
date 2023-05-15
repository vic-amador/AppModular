import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview';

import React from 'react'

const News = () => {
  return (
    <WebView
      source={{ uri: 'https://tonala.gob.mx/portal/' }}
    />
  )
}

export default News