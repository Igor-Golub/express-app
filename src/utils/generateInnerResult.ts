export default function generateInnerResult<Data = null>(
  status: Inner.Result<Data>["status"],
  meta: Inner.Meta<Data>,
): Inner.Result<Data> {
  return {
    status,
    meta,
  };
}
