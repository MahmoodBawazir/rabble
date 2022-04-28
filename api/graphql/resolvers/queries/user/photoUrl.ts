import { signImageUrl } from '../../../../utils/file-upload'

export default async (user: any, _: any, __: any) => {
  const { photoUrl } = user

  return signImageUrl(photoUrl, {
    w: 120,
    h: 120,
    dpr: 2,
    auto: 'compress',
  })
}
