const type = {
  regular: "Poppins-Regular",
  bold: "Poppins-Bold",
  extraBold: "Poppins-ExtraBold",
  thin: "Poppins-Thin",
  medium: "Poppins-Medium",
  extraLight: "Poppins-ExtraLight",
  semiBold: "Poppins-SemiBold",
};

const size = {
  xxxLarge: 30,
  xxLarge: 34,
  xLarge: 22,
  large: 18,
  medium: 16,
  small: 14,
  xSmall: 12,
  xxSmall: 8,
};

const lineHeight = {
  xLarge: 30,
  large: 24,
  medium: 22,
  small: 20,
  xSmall: 16,
};

export const typography = {
  xxxLargeBold: {
    fontFamily: type.bold,
    fontSize: size.xxxLarge,
    lineHeight: lineHeight.xLarge,
  },
  xLargeBold: {
    fontFamily: type.bold,
    fontSize: size.xLarge,
    lineHeight: lineHeight.xLarge,
  },

  xLargeMedium: {
    fontFamily: type.medium,
    fontSize: size.xLarge,
    lineHeight: lineHeight.xLarge,
  },

  mediumBold: {
    fontFamily: type.bold,
    fontSize: size.medium,
    lineHeight: lineHeight.medium,
  },
  mediumSemiBold: {
    fontFamily: type.semiBold,
    fontSize: size.medium,
    lineHeight: lineHeight.medium,
  },
  mediumRegular: {
    fontFamily: type.regular,
    fontSize: size.medium,
    lineHeight: lineHeight.medium,
  },

  smallRegular: {
    fontFamily: type.regular,
    fontSize: size.small,
    lineHeight: lineHeight.small,
  },

  smallThin: {
    fontFamily: type.thin,
    fontSize: size.small,
    lineHeight: lineHeight.small,
  },
  smallBold: {
    fontFamily: type.bold,
    fontSize: size.small,
    lineHeight: lineHeight.small,
  },
  smallSemiBold: {
    fontFamily: type.semiBold,
    fontSize: size.small,
    lineHeight: lineHeight.small,
  },

  largeRegular: {
    fontFamily: type.regular,
    fontSize: size.large,
    lineHeight: lineHeight.large,
  },
  largeBold: {
    fontFamily: type.bold,
    fontSize: size.large,
    lineHeight: lineHeight.large,
  },
  largeSemiBold: {
    fontFamily: type.semiBold,
    fontSize: size.large,
    lineHeight: lineHeight.large,
  },
  largeMedium: {
    fontFamily: type.medium,
    fontSize: size.large,
    lineHeight: lineHeight.large,
  },

  xSmallRegular: {
    fontFamily: type.regular,
    fontSize: size.xSmall,
    lineHeight: lineHeight.xSmall,
  },
  xSmallSemiBold: {
    fontFamily: type.semiBold,
    fontSize: size.xSmall,
    lineHeight: lineHeight.xSmall,
  },
  xSmallMedium: {
    fontFamily: type.medium,
    fontSize: size.xSmall,
    lineHeight: lineHeight.xSmall,
  },
};

export type VariantTypes = keyof typeof typography;

export const font = {
  ...type,
  lineHeight,
  size,
};
