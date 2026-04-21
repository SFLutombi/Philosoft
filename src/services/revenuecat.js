const STORAGE_KEY = "philosift_revenuecat_app_user_id";
const ALIGNMENT_ENTITLEMENT_ID = "Alignment System Access";
const MONTHLY_PACKAGE_ID = "monthly";
const REVENUECAT_API_KEY = import.meta.env.VITE_REVENUECAT_WEB_API_KEY || "test_pscRAsWYrSYEfNSxXmjUezssZZV";

let client = null;
let configurePromise = null;
let purchasesModulePromise = null;

function loadPurchasesModule() {
  if (!purchasesModulePromise) {
    purchasesModulePromise = import("@revenuecat/purchases-js");
  }

  return purchasesModulePromise;
}

function getAnonymousAppUserId(Purchases) {
  if (typeof window === "undefined") {
    return Purchases.generateRevenueCatAnonymousAppUserId();
  }

  try {
    const cachedUserId = window.localStorage.getItem(STORAGE_KEY);
    if (cachedUserId) {
      return cachedUserId;
    }

    const generatedUserId = Purchases.generateRevenueCatAnonymousAppUserId();
    window.localStorage.setItem(STORAGE_KEY, generatedUserId);
    return generatedUserId;
  } catch {
    return Purchases.generateRevenueCatAnonymousAppUserId();
  }
}

export function getAlignmentSystemEntitlementId() {
  return ALIGNMENT_ENTITLEMENT_ID;
}

export function getMonthlyPackageId() {
  return MONTHLY_PACKAGE_ID;
}

export function hasAlignmentSystemAccess(customerInfo) {
  return Boolean(customerInfo?.entitlements?.active?.[ALIGNMENT_ENTITLEMENT_ID]);
}

export function isRevenueCatCancelledError(error) {
  return Boolean(error && typeof error === "object" && "errorCode" in error && error.errorCode === 1);
}

export async function configureRevenueCat() {
  if (client) {
    return client;
  }

  if (!configurePromise) {
    configurePromise = loadPurchasesModule().then(({ Purchases }) => {
      client = Purchases.configure({
        apiKey: REVENUECAT_API_KEY,
        appUserId: getAnonymousAppUserId(Purchases),
      });

      return client;
    });
  }

  return configurePromise;
}

export async function getRevenueCatCustomerInfo() {
  const purchases = await configureRevenueCat();
  return purchases.getCustomerInfo();
}

export async function getRevenueCatOfferings() {
  const purchases = await configureRevenueCat();
  return purchases.getOfferings();
}

export function getMonthlyPackage(offerings) {
  return offerings?.current?.monthly ?? offerings?.current?.availablePackages?.find((pkg) => pkg.identifier === MONTHLY_PACKAGE_ID) ?? offerings?.current?.packagesById?.[MONTHLY_PACKAGE_ID] ?? null;
}

export async function presentRevenueCatPaywall({ target, offering, onNavigateToUrl, onVisitCustomerCenter } = {}) {
  const purchases = await configureRevenueCat();
  return purchases.presentPaywall({
    htmlTarget: target ?? undefined,
    offering: offering ?? undefined,
    onNavigateToUrl,
    onVisitCustomerCenter,
  });
}

export async function purchaseRevenueCatPackage(rcPackage, target) {
  const purchases = await configureRevenueCat();
  return purchases.purchase({
    rcPackage,
    htmlTarget: target ?? undefined,
    skipSuccessPage: true,
  });
}