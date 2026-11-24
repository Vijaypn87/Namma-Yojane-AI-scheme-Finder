// Every rule on a scheme is a hard requirement: failing any one of them
// excludes the scheme. A rule the user has not answered yet is "unknown" and
// lowers the match to "possible" instead of excluding it.
const isBlank = (value) => value === undefined || value === null || value === ''

export function checkEligibility(userProfile = {}, scheme) {
  const rules = scheme?.eligibility || {}
  const reasons = []
  const missingCriteria = []
  const failedCriteria = []

  const check = (result, reason, label) => {
    if (result === true) reasons.push(reason)
    else if (result === false) failedCriteria.push(label)
    else missingCriteria.push(label)
  }

  // Yes/No answers, also accepting the matching occupation from the form.
  const yesNo = (answer, occupationAlias) => {
    if (occupationAlias && userProfile.occupation === occupationAlias) return true
    if (isBlank(answer)) return undefined
    return answer === 'Yes'
  }

  if (rules.minAge || rules.maxAge) {
    const raw = userProfile.age
    const age = Number(raw)
    const known = !isBlank(raw) && Number.isFinite(age)
    const inRange = (!rules.minAge || age >= rules.minAge) && (!rules.maxAge || age <= rules.maxAge)
    check(known ? inRange : undefined, 'Your age is within the demo range.', 'Age requirement')
  }
  if (rules.gender) {
    check(isBlank(userProfile.gender) ? undefined : userProfile.gender === rules.gender, 'Your gender matches this demo criterion.', 'Gender requirement')
  }
  if (rules.student) check(yesNo(userProfile.studentStatus, 'Student'), 'You indicated that you are a student.', 'Student status')
  if (rules.farmer) check(yesNo(userProfile.farmerStatus, 'Farmer'), 'You indicated that you are a farmer.', 'Farmer status')
  if (rules.disability) check(yesNo(userProfile.disability), 'You indicated a disability-related support need.', 'Disability status')
  if (rules.occupation) {
    check(isBlank(userProfile.occupation) ? undefined : userProfile.occupation === rules.occupation, 'Your occupation matches this demo criterion.', 'Occupation requirement')
  }

  const totalRules = reasons.length + missingCriteria.length + failedCriteria.length
  if (failedCriteria.length) {
    return { status: 'not-eligible', score: 0, reasons, missingCriteria, failedCriteria }
  }
  const score = totalRules ? Math.round((reasons.length / totalRules) * 100) : 50
  const status = totalRules && !missingCriteria.length ? 'high-match' : 'possible-match'
  return { status, score, reasons, missingCriteria, failedCriteria }
}
