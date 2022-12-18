/** @param {NS} ns */

export async function main(ns) {

    var target = ns.args[0];
    var home = "home";
    var server = ns.getServer(target);
    var special = server["backdoorinstalled"];
    var baseDiff = server["baseDifficulty"];
    var cores = server["cpuCores"];
    var ftp = server["ftpPortOpen"];
    var security = server["hackDifficulty"];
    var admin = server["hasAdminRights"];
    var host = server["hostname"];
    var http = server["httpPortOpen"];
    var ip = server["ip"];
    var hooks = server["isConnectedTo"];
    var ram = server["maxRam"];
    var minDiff = server["minDifficulty"];
    var cash = server["moneyAvailable"];
    var maxCash = server["moneyMax"];
    var sudoWouldYou = server["numOpenPortsRequired"];
    var ports = server["openPortCount"];
    var owner = server["oranizationName"];
    var previousOwner;
    var mine = server["purchasedByPlayer"];
    var currentRam = server["ramUsed"];
    var skillz = server["requiredHackingSkill"];
    var growth = server["serverGrowth"];
    var smtp = server["smtpPortOpen"];
    var sql = server["sqlPortOpen"];
    var ssh = server["sshPortOpen"];
    var vectors = 0;
    var scriptRam = ns.getScriptRam("hack.js", home);
    var threads = ((ram / scriptRam) | 0);
    var cashTarget = maxCash * 0.75;
    var securityTarget = minDiff + 5;

    //Current vectors
    if (ns.fileExists("FTPCrack.exe", home)) {
        ns.ftpcrack(target);
        vectors += 1;
        ns.tprint("Port 21 successfully open @" + host);
    }
    if (ns.fileExists("BruteSSH.exe", home)) {
        ns.brutessh(target);
        vectors += 1;
        ns.tprint("Port 22 successfully open @" + host);

    }
    if (ns.fileExists("smpt.exe", home)) {
        vectors += 1;
        //ns.???(target);
    }
    if (ns.fileExists("sql.exe", home)) {
        vectors += 1;
        //ns.???(target);
    }

    if (vectors >= sudoWouldYou || ports >= sudoWouldYou) {
        ns.nuke(target);
        previousOwner = owner;
        owner = "The Mr.Robot Tech Team; POWNING your hz, bandwith, and cash with a smile!"
        ns.tprint("Owner changed from: " + previousOwner + "\nto: " + owner);
    }
    else { ns.print("Come back when you are stronger little one"); }
    if (ns.isRunning("hack.js", target)) { ns.tprint("Script found and killed:" + ns.scriptKill("hack.js", target)); }

    ns.scp("hack.js", target, home);
    ns.exec("hack.js", target, threads);
    ns.tprint("hack.js succsessfully running @"+ target + " with -t "+threads+"\nRam used ~: "+(scriptRam*threads).toFixed(2)+"/"+ram);
    
    if (ns.args[1]) {
        while (true) {
            if (ns.getServerSecurityLevel(target) > securityTarget) {
                await ns.weaken(target);
            } else if (ns.getServerMoneyAvailable(target) < cashTarget) {
                await ns.grow(target);
            } else {
                await ns.hack(target);
            }
        }
    }
}
