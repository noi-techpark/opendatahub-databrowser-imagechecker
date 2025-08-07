export interface Accommodation {
  Id: string
  Name: {
    en?: string
    it?: string
    [key: string]: string | undefined
  }
  ImageGallery?: {
    ValidFrom: string
    ValidTo: string
    ImageUrl: string
  }[]
  AccommodationType?: {
    Id: string
    Name: {
      [key: string]: string
    }
  }
  Category?: {
    Id: string
    Name: {
      [key: string]: string
    }
  }
  Region?: {
    Id: string
    Name: {
      [key: string]: string
    }
  }
  Municipality?: {
    Id: string
    Name: {
      [key: string]: string
    }
  }
  Badge?: string[]
  Theme?: string[]
  Tag?: string[]
  LanguageCodes?: string[]
  LastChangeDate?: string
  Source?: string
  SourceSystem?: string
  PublishedOn?: string[]
  PushedOn?: string
}
