/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncBizOwners = /* GraphQL */ `
  query SyncBizOwners(
    $filter: ModelBizOwnerFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBizOwners(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        ownerID
        username
        role
        status
        lname
        fname
        street
        unit
        city
        state
        zip
        questionnaireId
        businessName
        businessDBAName
        businessLogo
        businessEmail
        businessPhone
        businessURL
        practiceType
        mobileClinicType
        missionStatement
        visionStatement
        aboutBusiness
        ownerBiodata
        businessLicenseNumber
        businessLicenseAcquiredDate
        businessLicenseExpiryDate
        professionalLicenseName
        professionalLicenseNumber
        professionalLicenseAcquiredDate
        professionalLicenseExpiryDate
        hygieneAssociationMembership
        hygieneAssociationMembershipExpiryDate
        aDAMembership
        aDAMembershipExpiryDate
        continuingEducationHours
        continuingEducationHoursExpiryDate
        cPRNumber
        cPRNumberExpiryDate
        financialInstituteName
        primaryDentist
        primaryDentistPhone
        primaryDentistEmail
        secondaryDentist
        secondaryDentistPhone
        secondaryDentistEmail
        lawyerName
        lawyerPhone
        lawyerEmail
        accountantName
        accountantPhone
        accountantEmail
        websiteDesigner
        websiteSupport
        targetMarket
        socialMediaMarketing
        oldfashionedMarketing
        businessReviewsURL
        module1ActionsCompleted
        module2ActionsCompleted
        module3ActionsCompleted
        module4ActionsCompleted
        module5ActionsCompleted
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getBizOwner = /* GraphQL */ `
  query GetBizOwner($id: ID!) {
    getBizOwner(id: $id) {
      id
      ownerID
      username
      role
      status
      lname
      fname
      street
      unit
      city
      state
      zip
      questionnaireId
      businessName
      businessDBAName
      businessLogo
      businessEmail
      businessPhone
      businessURL
      practiceType
      mobileClinicType
      missionStatement
      visionStatement
      aboutBusiness
      ownerBiodata
      businessLicenseNumber
      businessLicenseAcquiredDate
      businessLicenseExpiryDate
      professionalLicenseName
      professionalLicenseNumber
      professionalLicenseAcquiredDate
      professionalLicenseExpiryDate
      hygieneAssociationMembership
      hygieneAssociationMembershipExpiryDate
      aDAMembership
      aDAMembershipExpiryDate
      continuingEducationHours
      continuingEducationHoursExpiryDate
      cPRNumber
      cPRNumberExpiryDate
      financialInstituteName
      primaryDentist
      primaryDentistPhone
      primaryDentistEmail
      secondaryDentist
      secondaryDentistPhone
      secondaryDentistEmail
      lawyerName
      lawyerPhone
      lawyerEmail
      accountantName
      accountantPhone
      accountantEmail
      websiteDesigner
      websiteSupport
      targetMarket
      socialMediaMarketing
      oldfashionedMarketing
      businessReviewsURL
      module1ActionsCompleted
      module2ActionsCompleted
      module3ActionsCompleted
      module4ActionsCompleted
      module5ActionsCompleted
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listBizOwners = /* GraphQL */ `
  query ListBizOwners(
    $filter: ModelBizOwnerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBizOwners(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ownerID
        username
        role
        status
        lname
        fname
        street
        unit
        city
        state
        zip
        questionnaireId
        businessName
        businessDBAName
        businessLogo
        businessEmail
        businessPhone
        businessURL
        practiceType
        mobileClinicType
        missionStatement
        visionStatement
        aboutBusiness
        ownerBiodata
        businessLicenseNumber
        businessLicenseAcquiredDate
        businessLicenseExpiryDate
        professionalLicenseName
        professionalLicenseNumber
        professionalLicenseAcquiredDate
        professionalLicenseExpiryDate
        hygieneAssociationMembership
        hygieneAssociationMembershipExpiryDate
        aDAMembership
        aDAMembershipExpiryDate
        continuingEducationHours
        continuingEducationHoursExpiryDate
        cPRNumber
        cPRNumberExpiryDate
        financialInstituteName
        primaryDentist
        primaryDentistPhone
        primaryDentistEmail
        secondaryDentist
        secondaryDentistPhone
        secondaryDentistEmail
        lawyerName
        lawyerPhone
        lawyerEmail
        accountantName
        accountantPhone
        accountantEmail
        websiteDesigner
        websiteSupport
        targetMarket
        socialMediaMarketing
        oldfashionedMarketing
        businessReviewsURL
        module1ActionsCompleted
        module2ActionsCompleted
        module3ActionsCompleted
        module4ActionsCompleted
        module5ActionsCompleted
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncRegistrationQns = /* GraphQL */ `
  query SyncRegistrationQns(
    $filter: ModelRegistrationQnsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRegistrationQns(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        questionnaireId
        passion
        othersInterest
        planB
        pricePoint
        competition
        growBusiness
        insuranceNeeds
        costOfEntry
        monthlyLivingExpenses
        readyAndDriven
        additionalNotes1
        additionalNotes2
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getRegistrationQns = /* GraphQL */ `
  query GetRegistrationQns($id: ID!) {
    getRegistrationQns(id: $id) {
      id
      questionnaireId
      passion
      othersInterest
      planB
      pricePoint
      competition
      growBusiness
      insuranceNeeds
      costOfEntry
      monthlyLivingExpenses
      readyAndDriven
      additionalNotes1
      additionalNotes2
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listRegistrationQnss = /* GraphQL */ `
  query ListRegistrationQnss(
    $filter: ModelRegistrationQnsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRegistrationQnss(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        questionnaireId
        passion
        othersInterest
        planB
        pricePoint
        competition
        growBusiness
        insuranceNeeds
        costOfEntry
        monthlyLivingExpenses
        readyAndDriven
        additionalNotes1
        additionalNotes2
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
