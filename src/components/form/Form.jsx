import React, { useState } from "react";
import "./form.css";
import options from "../../data/data";
import { useFormik } from "formik";
import validationSchema from "../../validation/validation";
import { initializePayment, confirmPayment } from "../../api";
import { TextField, MenuItem } from "@mui/material";

const Form = () => {
	const [selectedOpt, setSelected] = useState(0);

	const formik = useFormik({
		initialValues: {
			services: "",
			companyName: "",
			phone: "",
			email: "",
			aadhaar: "",
			pan: "",
			price: 0
		},
		validationSchema,
		onSubmit: (values, { resetForm }) => {
			console.log(values);
			values.option = options[selectedOpt];
			initializePayment(values).then(({ data }) => {
				const options = {
					key: "rzp_test_I54yg0JC93Hxui",
					amount: data.amount, // amount in the smallest currency unit
					currency: "INR",
					name: "ECFILE",
					description: "Purchase Description",
					order_id: data.id, // generated on your server
					handler: function (response) {
						// Handle the successful payment response
						confirmPayment(response, values);
						resetForm({ values: "" });
					},
					prefill: {
						name: "Abhi",
						email: "johndoe@example.com"
					},
					modal: {
						ondismiss: function () {
							// Handle the dismiss of the payment modal
						}
					}
				};

				const razorpay = new window.Razorpay(options);
				razorpay.open();
				razorpay.on("payment.failed", function (response) {
					console.log(response);
					confirmPayment(response, values);
				});
			});
		}
	});

	return (
		<div className="main">
			<div className="main__left">
				<div className="left__section-text">
					<h1 className="left__section-heading">
						GST Registration Online
					</h1>
				</div>
				<div className="options">
					<h3>GST Registration Free</h3>
					<h3>Unlimited Bills GST Returns</h3>
					<h3>Free GST Billing Software</h3>
					<h3>Udyam Registration</h3>
					<h3>Get this package for Rs.2999 / Year + 18% GST</h3>
				</div>
			</div>
			<div className="main__right">
				<div className="right__form-container">
					<h3 className="form__heading">
						Application for GST Registration
					</h3>
					{/* <form
						noValidate
						className="form__section"
						onSubmit={formik.handleSubmit}>
						<div>
							<select
								required
								onChange={(e) => setSelected(e.target.value)}
								placeholder="services"
								className="form__select"
								name="services">
								<option disabled defaultChecked>
									Services
								</option>
								{options.map((item, index) => {
									return (
										<option key={item.name} value={index}>
											{item.name}
										</option>
									);
								})}
							</select>
						</div>
						<div>
							<input
								type="text"
								placeholder="Company name"
								className="form__input"
								name="companyName"
								onChange={formik.handleChange}
								value={formik.values.companyName}
							/>
							{formik.touched.companyName &&
							formik.errors.companyName ? (
								<div className="formik_error" style={{ color: "red" }}>
									{formik.errors.companyName}
								</div>
							) : null}
						</div>
						<div>
							<input
								type="text"
								placeholder="Your phone"
								className="form__input"
								name="phone"
								onChange={formik.handleChange}
								value={formik.values.phone}
							/>
							{formik.touched.phone && formik.errors.phone ? (
								<div className="formik_error" style={{ color: "red" }}>
									{formik.errors.phone}
								</div>
							) : null}
						</div>
						<div>
							<input
								type="email"
								placeholder="Your email"
								className="form__input"
								name="email"
								onChange={formik.handleChange}
								value={formik.values.email}
							/>
							{formik.touched.email && formik.errors.email ? (
								<div className="formik_error" style={{ color: "red" }}>
									{formik.errors.email}
								</div>
							) : null}
						</div>
						<div>
							<input
								type="text"
								placeholder="Aadhaar number"
								className="form__input"
								name="aadhaar"
								onChange={formik.handleChange}
								value={formik.values.aadhaar}
							/>
							{formik.touched.aadhaar && formik.errors.aadhaar ? (
								<div className="formik_error" style={{ color: "red" }}>
									{formik.errors.aadhaar}
								</div>
							) : null}
						</div>
						<div>
							<input
								type="text"
								placeholder="Enter PAN number"
								className="form__input"
								name="pan"
								onChange={formik.handleChange}
								value={formik.values.pan}
							/>
							{formik.touched.pan && formik.errors.pan ? (
								<div className="formik_error" style={{ color: "red" }}>
									{formik.errors.pan}
								</div>
							) : null}
						</div>
						<div>
							<input
								type="text"
								placeholder="Rs "
								className="form__input"
								name="price"
								value={options[selectedOpt].price}
								readOnly
							/>
						</div>
						<div>
							<button type="submit" className="submit__button">
								PAY NOW
							</button>
						</div>
					</form> */}
					<form
						noValidate
						className="form__section"
						onSubmit={formik.handleSubmit}>
						<div className="form__inner-main">
							<div className="input__divider">
								<TextField
									onChange={(e) => setSelected(e.target.value)}
									select
									id="outlined-basic"
									label="Services"
									variant="outlined"
									size="small"
									fullWidth>
									{options.map((item, index) => (
										<MenuItem key={item.name} value={index}>
											{item.name}
										</MenuItem>
									))}
								</TextField>
							</div>
							<div className="input__divider">
								<TextField
									fullWidth
									id="outlined-basic"
									label="Name of Company"
									variant="outlined"
									size="small"
									name="companyName"
									onChange={formik.handleChange}
									value={formik.values.companyName}
								/>
								{formik.touched.companyName &&
								formik.errors.companyName ? (
									<div
										className="formik_error"
										style={{ color: "red" }}>
										{formik.errors.companyName}
									</div>
								) : null}
							</div>
							<div className="input__divider">
								<TextField
									fullWidth
									id="outlined-basic"
									label="Phone"
									size="small"
									name="phone"
									onChange={formik.handleChange}
									value={formik.values.phone}
									variant="outlined"
								/>
								{formik.touched.phone && formik.errors.phone ? (
									<div
										className="formik_error"
										style={{ color: "red" }}>
										{formik.errors.phone}
									</div>
								) : null}
							</div>
							<div className="input__divider">
								<TextField
									fullWidth
									id="outlined-basic"
									label="Email"
									variant="outlined"
									size="small"
									name="email"
									onChange={formik.handleChange}
									value={formik.values.email}
								/>
								{formik.touched.email && formik.errors.email ? (
									<div
										className="formik_error"
										style={{ color: "red" }}>
										{formik.errors.email}
									</div>
								) : null}
							</div>
							<div className="input__divider">
								<TextField
									fullWidth
									id="outlined-basic"
									label="Aadhaar No"
									size="small"
									name="aadhaar"
									onChange={formik.handleChange}
									value={formik.values.aadhaar}
									variant="outlined"
								/>
								{formik.touched.aadhaar && formik.errors.aadhaar ? (
									<div
										className="formik_error"
										style={{ color: "red" }}>
										{formik.errors.aadhaar}
									</div>
								) : null}
							</div>
							<div className="input__divider">
								<TextField
									fullWidth
									id="outlined-basic"
									label="PAN"
									variant="outlined"
									size="small"
									name="pan"
									onChange={formik.handleChange}
									value={formik.values.pan}
								/>
								{formik.touched.pan && formik.errors.pan ? (
									<div
										className="formik_error"
										style={{ color: "red" }}>
										{formik.errors.pan}
									</div>
								) : null}
							</div>
							<div className="input__divider">
								<TextField
									fullWidth
									id="outlined-basic"
									label="Amount"
									variant="outlined"
									size="small"
									name="price"
									value={options[selectedOpt].price}
									InputProps={{
										readOnly: true
									}}
								/>
							</div>
							<div className="input__divider">
								<button type="submit" className="submit__button">
									PAY NOW
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Form;
