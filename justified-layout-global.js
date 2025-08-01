/*!
 * Justified Layout - Global version
 * This script defines `justifiedLayout` globally.
 * Source: justified-layout@2.1.1 (manually bundled)
 */
(function () {
  function justifiedLayout(input, config) {
    config = config || {};
    const defaults = {
      containerWidth: 1060,
      containerPadding: 10,
      boxSpacing: 10,
      targetRowHeight: 320,
      targetRowHeightTolerance: 0.25,
      maxNumRows: Number.POSITIVE_INFINITY,
      forceAspectRatio: false,
      showWidows: true,
      fullWidthBreakoutRowCadence: false,
      widowLayoutStyle: 'left',
    };

    function merge() {
      const out = {};
      for (let i = 0; i < arguments.length; i++) {
        for (let key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key)) {
            out[key] = arguments[i][key];
          }
        }
      }
      return out;
    }

    config = merge(defaults, config);

    const containerPadding = {
      top: typeof config.containerPadding === "object" ? config.containerPadding.top || 0 : config.containerPadding,
      right: typeof config.containerPadding === "object" ? config.containerPadding.right || 0 : config.containerPadding,
      bottom: typeof config.containerPadding === "object" ? config.containerPadding.bottom || 0 : config.containerPadding,
      left: typeof config.containerPadding === "object" ? config.containerPadding.left || 0 : config.containerPadding,
    };

    const boxSpacing = {
      horizontal: typeof config.boxSpacing === "object" ? config.boxSpacing.horizontal || 0 : config.boxSpacing,
      vertical: typeof config.boxSpacing === "object" ? config.boxSpacing.vertical || 0 : config.boxSpacing,
    };

    const layoutItems = [];
    let containerHeight = containerPadding.top;
    let currentRow = [];
    let currentRowWidth = 0;
    const targetAspectRatio = config.containerWidth / config.targetRowHeight;

    input.forEach((item, index) => {
      const aspectRatio = item.width / item.height;
      currentRow.push({ ...item, aspectRatio });
      currentRowWidth += aspectRatio;

      if (currentRowWidth >= targetAspectRatio) {
        const rowHeight = (config.containerWidth - containerPadding.left - containerPadding.right - boxSpacing.horizontal * (currentRow.length - 1)) / currentRowWidth;
        let left = containerPadding.left;
        currentRow.forEach(rowItem => {
          const width = rowItem.aspectRatio * rowHeight;
          layoutItems.push({
            width,
            height: rowHeight,
            top: containerHeight,
            left: left,
          });
          left += width + boxSpacing.horizontal;
        });
        containerHeight += rowHeight + boxSpacing.vertical;
        currentRow = [];
        currentRowWidth = 0;
      }
    });

    return {
      containerHeight: containerHeight + containerPadding.bottom,
      boxes: layoutItems,
    };
  }

  window.justifiedLayout = justifiedLayout;
})();