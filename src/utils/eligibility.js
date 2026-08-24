export function checkEligibility(userProfile = {}, scheme) {
  const rules = scheme?.eligibility || {}
  const reasons = []
  const missingCriteria = []
  const add = (condition, reason, missing) => condition ? reasons.push(reason) : missingCriteria.push(missing)

  if (rules.minAge || rules.maxAge) {
    const age = Number(userProfile.age)
    const inRange = Number.isFinite(age) && (!rules.minAge || age >= rules.minAge) && (!rules.maxAge || age <= rules.maxAge)
    add(inRange, 'Your age is within the demo range.', 'Age requirement')
  }
  if (rules.gender) add(userProfile.gender === rules.gender, 'Your gender matches this demo criterion.', 'Gender requirement')
  if (rules.student) add(userProfile.studentStatus === 'Yes', 'You indicated that you are a student.', 'Student status')
  if (rules.farmer) add(userProfile.farmerStatus === 'Yes', 'You indicated that you are a farmer.', 'Farmer status')
  if (rules.disability) add(userProfile.disability === 'Yes', 'You indicated a disability-related support need.', 'Disability status')
  if (rules.occupation) add(userProfile.occupation === rules.occupation, 'Your occupation matches this demo criterion.', 'Occupation requirement')

  const totalRules = reasons.length + missingCriteria.length
  const score = totalRules ? Math.round((reasons.length / totalRules) * 100) : 50
  const status = score >= 80 ? 'high-match' : score > 0 ? 'possible-match' : 'not-eligible'
  return { status, score, reasons, missingCriteria }
}
