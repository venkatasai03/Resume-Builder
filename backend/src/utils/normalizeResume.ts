export const normalizeResume = (resume: any) => {
  const { _id, ...rest } = resume.toObject();
  return {
    id: _id,
    ...rest,
  };
};