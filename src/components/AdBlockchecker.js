import React, { useState } from 'react';
import { AdBlockDetector } from 'ad-block-detector';

function AdBlockChecker() {
  const [isAdBlockEnabled, setIsAdBlockEnabled] = useState(false);

  return (
    <AdBlockDetector
      onDetected={() => setIsAdBlockEnabled(true)}
    >
      {isAdBlockEnabled &&
        <p>AdBlock is enabled. Please disable it to use this page.</p>
      }
    </AdBlockDetector>
  );
}

export default AdBlockChecker;
