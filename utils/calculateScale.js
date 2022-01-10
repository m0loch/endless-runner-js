function CalculateScale(baseWidth, baseHeight) {
    const horizontalFit = baseWidth / 16;
    const verticalFit = baseHeight / 12;

    if (horizontalFit < verticalFit) {
        return {
            width: baseWidth,
            height: baseWidth * 0.75,
            scale: horizontalFit / 16,
        }
    } else {
        return {
            width: baseHeight * (4 / 3),
            height: baseHeight,
            scale: verticalFit / 16,
        }
    }
}

export default CalculateScale;