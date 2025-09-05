/*

SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later

*/


export interface Accommodation {
  Id: number
  Name: {
    en?: string
    it?: string
    [key: string]: string | undefined
  }
  ImageGallery?: {
    ValidFrom: string
    ValidTo: string
    ImageUrl: string
    Width: number
    Height: number
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
  AccoDetail?: {
    [lang: string]: {
      Name?: string
    }
  }
  AccoType?: {
    Id: string
    Name: {
      [key: string]: string
    }
  }
  AccoCategory?: {
    Id: string
    Name: {
      [key: string]: string
    }
  }

  LocationInfo?: {
    RegionInfo?: {
      Name?: {
        [key: string]: string
      }
    }
    MunicipalityInfo?: {
      Name?: {
        [key: string]: string
      }
    }
  }

  
  AccoBadges?: { Id: string }[]
  AccoThemes?: { Id: string }[]
  ODHTags?:{ Id: string }[]
  Active?: string

  HasLanguage?: string[]

  _Meta?: {
    LastUpdate?: string
    Source?: string
  }

  
 
}
