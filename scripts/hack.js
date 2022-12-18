/** @param {NS} ns */
export async function main(ns) {

	var host = ns.getHostname()
	var cashTarget = ns.getServerMaxMoney(host) * 0.75
	var securityTarget = ns.getServerSecurityLevel(host) + 5

	while (true) {
		if (ns.getServerSecurityLevel(host) > securityTarget) {
			await ns.weaken(host);
		} else if (ns.getServerMoneyAvailable(host) < cashTarget) {
			await ns.grow(host);
		} else {
			await ns.hack(host);
		}
	}
}
