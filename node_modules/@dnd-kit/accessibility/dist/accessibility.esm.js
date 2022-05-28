import React, { useState, useCallback } from 'react';

const hiddenStyles = {
  display: 'none'
};
function HiddenText({
  id,
  value
}) {
  return React.createElement("div", {
    id: id,
    style: hiddenStyles
  }, value);
}

const visuallyHidden = {
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(100%)',
  whiteSpace: 'nowrap'
};
function LiveRegion({
  id,
  announcement
}) {
  return React.createElement("div", {
    id: id,
    style: visuallyHidden,
    role: "status",
    "aria-live": "assertive",
    "aria-atomic": true
  }, announcement);
}

function useAnnouncement() {
  const [announcement, setAnnouncement] = useState('');
  const announce = useCallback(value => {
    if (value != null) {
      setAnnouncement(value);
    }
  }, []);
  return {
    announce,
    announcement
  };
}

export { HiddenText, LiveRegion, useAnnouncement };
//# sourceMappingURL=accessibility.esm.js.map
