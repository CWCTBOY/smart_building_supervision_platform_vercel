const basicFormValidater = (req: any) => {
  const { constructionClass, detailConstructionClass, managerId } = req;
  if (constructionClass === "" && detailConstructionClass === "") {
    return false;
  }
  if (managerId === 0) {
    return false;
  }
  return true;
};
export default basicFormValidater;
