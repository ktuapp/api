import { cleanNotificationForFirebase } from '../src/utils/notifications'

test('testing clean notification for firebase function', () => {
  const oldNotification = '{"date":"Sat Aug 31 00:00:00 IST 2019","heading":"The result of MCA S6 (R&S) Exam & MCA Second Year Direct S4 (R&S) Exam June 2019 (Extended Submission) published","key":"the-result-of-mca-s6-r-and-s-exam-and-mca-second-year-direct-s4-r-and-s-exam-june-2019-extended-submission-published","data":" The result of MCA S6 (R&S) Examination May 2019 and MCA Second Year Direct S4 (R&S) Examination June 2019 (Extended Submission) is published herewith."}'
  const newNotification = {
    data: {
      'date': 'Sat Aug 31 00:00:00 IST 2019',
      'heading': 'The result of MCA S6 (R&S) Exam & MCA Second Year Direct S4 (R&S) Exam June 2019 (Extended Submission) published',
      'key': 'the-result-of-mca-s6-r-and-s-exam-and-mca-second-year-direct-s4-r-and-s-exam-june-2019-extended-submission-published',
      'data': ' The result of MCA S6 (R&S) Examination May 2019 and MCA Second Year Direct S4 (R&S) Examination June 2019 (Extended Submission) is published herewith.',
      'click_action': 'FLUTTER_NOTIFICATION_CLICK'
    },
    notification: {
      'title': 'The result of MCA S6 (R&S) Exam & MCA Second Year Direct S4 (R&S) Exam June 2019 (Extended Submission) published',
      'body': ' The result of MCA S6 (R&S) Examination May 2019 and MCA Second Year Direct S4 (R&S) Examination Jun...'
    }, topic: 'ktu_notification'
  }
  expect(cleanNotificationForFirebase(oldNotification)).toEqual(newNotification)
})
