<template>
	<div>
		<Head>
			<Title>Cancellation & Return Policy | {{$appName}}</Title>
		</Head>
		<div class="md:w-3/4 grid gap-4 md:gap-6">
			<section>
				<h1 class="text-3xl font-bold">
					{{$appName}} Cancellation & Return Policy
				</h1>
			</section>
			<section>
				<h2 class="text-xl font-medium mb-2">1. Welcome</h2>
				

				<div class="grid gap-2 md:gap-3 text-foreground/70">
					<p>
						1.1 At {{$appName}}, we want you to love everything you get from us. But if for any reason you're not satisfied with your order or you simply change your mind, this policy explains how you can return your item(s) and receive a refund.
					</p>

					<p>
						1.2 This Cancellation and Returns Policy sets out your rights when returning items, whether you're changing your mind, have received the wrong item, or there’s a problem with your order.
					</p>


					<p>
						1.3 This policy forms part of our broader <nuxt-link :to="{name: 'terms'}" class="underline text-primary font-medium">Terms & Conditions</nuxt-link> and should be read alongside them. Any terms not defined here carry the same meaning as in the Terms & Conditions.
					</p>

					<p>
						1.4 We take your privacy seriously. To understand how your data is handled, please refer to our Privacy Policy.
					</p>
				</div>
			</section>



			<section>
				<h2 class="text-xl font-medium mb-2">2. If You Change Your Mind</h2>
				

				<div class="grid gap-2 md:gap-3 text-foreground/70">
					<p>
						2.1 You may cancel your order for any reason within 14 calendar days from the day you—or someone you nominate (not including the delivery company)—receive your item(s).
					</p>

					<p>
						2.2 If your order contains multiple items delivered separately, the 14-day window starts from the day the last item is delivered.
					</p>


					<p>
						2.3 You do not need to give a reason for the cancellation—just notify us within the timeframe above.
					</p>

					<p>
						2.4 To cancel, see Section 5 ("How to Cancel").
					</p>

					<p>
						2.5 You cannot return Products that:
					</p>

					<ul class="list-disc list-inside">
						<li>Have been customised or personalised in any way;</li>
						<li>Were sealed for hygiene reasons and have been opened;</li>
						<li>Are mixed inseparably with other goods after delivery;</li>
						<li>Were bought for commercial, trade, or resale purposes.</li>
					</ul>

				</div>
			</section>



			<section>
				<h2 class="text-xl font-medium mb-2">3. If We’ve Made a Mistake or Changed Something</h2>
				

				<div class="grid gap-2 md:gap-3 text-foreground/70">
					<p>
						3.1 You can also cancel your order if:
					</p>

					<ul class="list-disc list-inside">
						<li>We’ve changed the product or our terms and you disagree with them;</li>
						<li>There was a clear pricing or description error and you no longer wish to proceed;</li>
						<li>We suspend the product for more than 30 days due to technical issues;</li>
						<li>There’s a significant delay in delivery;</li>
						<li>Or if you have a legal right to do so because of something we did wrong.</li>
					</ul>

					<p>
						3.2 In such cases, we will refund you in full, subject to deductions allowed by law (see Section 7).

					</p>

				</div>
			</section>


			<section>
				<h2 class="text-xl font-medium mb-2">4. If the Product is Faulty or Incorrect</h2>
				

				<div class="grid gap-2 md:gap-3 text-foreground/70">
					<p>
						4.1 If your item is damaged, defective, or not as described—and we cannot fix or replace it—you can cancel your order and receive a full refund (including delivery fees and reasonable return costs). More details are available in our <nuxt-link :to="{name: 'terms'}" class="underline text-primary font-medium">Terms & Conditions.</nuxt-link>
					</p>



				</div>
			</section>



			<section>
				<h2 class="text-xl font-medium mb-2">5. How to Cancel</h2>
				

				<div class="grid gap-2 md:gap-3 text-foreground/70">
					<p>
						To cancel an order or request a return on {{$appName}}, you must have a registered user account. From your Orders page, you will be able to cancel eligible orders or file a return request—provided the cancellation or return window is still open.
					</p>

					<p>
						If you checked out as a guest (i.e., without creating an account), please contact our support team. We will guide you through the steps needed to cancel your order or request a refund manually.
					</p>

					<p>
						For assistance, reach out via <a class="text-primary underline font-medium" :href="`mailto:support@${$appName}.com`">support@{{$appName}}.com</a>.
					</p>
				</div>
			</section>




			<section>
				<h2 class="text-xl font-medium mb-2">6. Returning Your Item</h2>
				

				<div class="grid gap-2 md:gap-3 text-foreground/70">
					<p>
						6.1 After cancelling, you must return your items within 3 calendar days of letting us know.
					</p>

					<p>6.2 Return instructions:</p>

					<ul class="list-disc list-inside">
						<li>Please use the original packaging. If unavailable, pack securely with materials that protect the item.</li>
						<li>Use the prepaid return label provided in your package. If you did not receive one, contact support for assistance.</li>
					</ul>


					<p>
						6.3 If you return an item because:
					</p>

					<div>
						<ul class="list-disc list-inside">
							<li>It’s defective or misdescribed,</li>
							<li>We made a pricing or product change that you disagree with,</li>
							<li>Or another legal reason applies,</li>
						</ul>

						<p> we will refund your reasonable return costs. Otherwise, return shipping is your responsibility.</p>
					</div>


					<p>
						6.4 Items bought on {{$appName}} must be returned via the platform. We do not accept returns at any pop-up or physical stores we may operate.
					</p>
				</div>
			</section>




			<section>
				<h2 class="text-xl font-medium mb-2">7. Refunds</h2>
				

				<div class="grid gap-2 md:gap-3 text-foreground/70">
					<p> 7.1 Refunds will be processed after we:</p>


					<ul class="list-disc list-inside">
						<li>Receive your returned item; or</li>
						<li>Receive proof that you’ve shipped it back—whichever comes first.</li>
					</ul>


					<p> 7.2 Refunds will not be issued for: </p>

					<div>
						<ul class="list-disc list-inside">
							<li>Returned items that don’t match the order placed;</li>
							<li>Items not purchased on the {{$appName}} Platform</li>
							<li>Or another legal reason applies,</li>
						</ul>
					</div>


					<p>
						7.3 We may reduce your refund if the item shows signs of use beyond what is reasonable to inspect its features or fit (like you would in a store).
					</p>

				</div>
			</section>












		</div>
	</div>
</template>
<script setup lang="ts">

definePageMeta({
	layout : 'legal'
})

</script>
