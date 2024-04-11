import { ApplicationError } from "../../Error-handler/applicationerror.js";
import UserModel from "./user.schema.js";
import { createObjectCsvWriter } from 'csv-writer';
import { fetchStudentSchemaData } from "../../config/csv.config.js";
import bcrypt from 'bcrypt';

export default class UserRepository {

    async addUser(data) {
        try {
            const { name, email, password } = data;
            const userExist = await UserModel.findOne({ email: email });
            if (!userExist) {
                const newUser = new UserModel({
                    name,
                    email,
                    password
                })
                const savedUser = await newUser.save();
                return { success: true, res: savedUser }
            } else {
                return { success: false, res: "User already exist" }
            }

        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async login(loginData) {
        try {
            const { email, password } = loginData;
            const user = await UserModel.findOne({ email });
            if (!user) {
                return { success: false, res: "User not found, please signup" }
            } else {
                let passwordValidation = await bcrypt.compare(password, user.password);
                if (passwordValidation) {
                    return { success: true, res: user }
                } else {
                    return { success: false, res: "Invalid credentials" }
                }
            }

        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async createCSV() {
        try {
            const students = await fetchStudentSchemaData();
            const formattedStudents = [];
            students.forEach(student => {
                // Check if the student has interviews
                if (student.interviews.length > 0) {
                    // If the student has interviews, iterate through each interview
                    student.interviews.forEach(interview => {
                        // Format the current interview data
                        const formattedInterview = {
                            name: student.name,
                            batch: student.batch,
                            college: student.college,
                            status: student.status,
                            'DSA Final Score': student.courseScores.find(score => score.subject === 'DSA').score || '',
                            'WebD Final Score': student.courseScores.find(score => score.subject === 'WebD').score || '',
                            'React Final Score': student.courseScores.find(score => score.subject === 'React').score || '',
                            company: interview.company,
                            date: interview.date,
                            result: interview.result
                        };

                        // Add the formatted interview to the array
                        formattedStudents.push(formattedInterview);
                    });
                } else {
                    // If the student has no interviews, add a row with empty interview data
                    formattedStudents.push({
                        name: student.name,
                        batch: student.batch,
                        college: student.college,
                        status: student.status,
                        'DSA Final Score': student.courseScores.find(score => score.subject === 'DSA').score || '',
                        'WebD Final Score': student.courseScores.find(score => score.subject === 'WebD').score || '',
                        'React Final Score': student.courseScores.find(score => score.subject === 'React').score || '',
                        company: '',
                        date: '',
                        result: ''
                    });
                }
            });

            const csvWriter = createObjectCsvWriter({
                path: 'data.csv',
                header: [
                    { id: 'name', title: 'Name' },
                    { id: 'batch', title: 'Batch' },
                    { id: 'college', title: 'College' },
                    { id: 'status', title: 'Status' },
                    { id: 'DSA Final Score', title: 'DSA Final Score' },
                    { id: 'WebD Final Score', title: 'WebD Final Score' },
                    { id: 'React Final Score', title: 'React Final Score' },
                    { id: 'company', title: 'Company' },
                    { id: 'date', title: 'Interview Date' },
                    { id: 'result', title: 'Result' }
                ]
            });


            await csvWriter.writeRecords(formattedStudents);
            return { success: true, res: 'CSV file written successfully' };
        } catch (err) {
            console.error('Error writing CSV file:', err);
        }

    }


}