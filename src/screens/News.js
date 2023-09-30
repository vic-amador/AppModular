import React, { useRef, useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';

const News = () => {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  // Manejar el evento de retroceso de hardware
  const handleBackButton = () => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goBack();
      return true; // Evitar el comportamiento predeterminado del botón de retroceso
    }
    return false;
  };

  // Agregar un manejador de eventos para el botón de retroceso de hardware
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      // Limpiar el manejador de eventos cuando se desmonta el componente
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [canGoBack]);

  // Manejar el cambio de estado de la navegación en el WebView
  const handleNavigationStateChange = navState => {
    // Verificar si el WebView puede retroceder
    setCanGoBack(navState.canGoBack);
  };

  return (
    <>
      <WebView
        source={{ uri: 'https://tonala.gob.mx/portal/' }}
        ref={webViewRef}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </>
  );
};

export default News;