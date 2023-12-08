function ShowIcon({ htmlString }) {
  const iconHtml = { __html: htmlString };
  return <div dangerouslySetInnerHTML={iconHtml} />;
}
export default ShowIcon