/** @jsxImportSource @emotion/react */

function Image ({ webp, png, src, alt, lazy, width, height, imageCss }) {
  return (
    <picture>
      {webp ? <source type="image/webp" srcSet={webp} data-testid="image-webp"/> : null}
      {png ? <source type="image/png" srcSet={png} data-testid="image-png"/> : null}
      <img
        src={png || webp || src}
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        width={width}
        height={height}
        css={imageCss}
        data-testid="image-regular"
      />
    </picture>
  );
}

export default Image;
