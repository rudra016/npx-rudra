#!/usr/bin/env node

import chalk from "chalk"
import inquirer from "inquirer"
import open from "open"
import figlet from "figlet"
import gradient from "gradient-string"

/**
 * Project data
 */
const PROJECTS = [
  {
    name: "Flux Forms AI",
    description:
      "Effortlessly design AI-driven forms that captivate users and gather insights like never before. Transform data collection into a seamless experience.",
    link: "https://flux-form.vercel.app/",
    stack: "NextJs, Gemini, NeonDB, Drizzle ORM, DaisyUI, HyperUI, Clerk",
  },
  {
    name: "TrueDat",
    description:
      "I built an AI-powered fact-checking system capable of verifying information across multiple formats, including images, text, audio, web links, and live broadcast feeds. The system is integrated with a LangGraph-based chatbot that leverages these tools to deliver real-time, multi-modal fact verification from any source.",
    link: "https://github.com/rudra016/satya-backend",
    stack: "Python, Langgraph, NextJs, Neo4J, Whisper, OpenAI, FFmpeg",
  },
]

/**
 * Display header and personal information
 */
function displayHeader() {
  const text = figlet('RudraCodes', (err, data) => {
    if (err) throw err;
    console.log(gradient.atlas.multiline(data));
  });

  console.log(chalk.whiteBright.bold(text))

  const infoLines = [
    "\n",
    chalk.gray("Hey, I'm ") + chalk.white.bold("Rudra Kumar"),
    chalk.gray("Full Stack Developer by day, bug exorcist by night."),
    chalk.gray("On a quest to build cool stuff that actually works — most of the time."),
    chalk.gray("Trying to tame the TypeScript beast, while Go is just a distant crush"),
    "",
    chalk.white.bold("Socials:"),
    "",
    chalk.white("  Twitter:") + " " + chalk.magenta("https://x.com/unsaintme"),
    chalk.white("  LinkedIn:") +
      " " +
      chalk.magenta("https://www.linkedin.com/in/rudra-kumar-897264227/"),
    chalk.white("  GitHub:") +
      " " +
      chalk.magenta("https://github.com/rudra016"),
    chalk.white("  Website:") + " " + chalk.magenta("https://www.rudrakumar.site/"),
  ]

  // Display info lines
  infoLines.forEach((line) => console.log(line))
}

/**
 * Display and interact with projects
 */
async function showProjects() {
  console.clear()
  console.log("\n")

  // Header
  console.log(chalk.white.bold("Selected Projects\n"))

  // Display each project
  PROJECTS.forEach((project, index) => {
    console.log(chalk.blue.bold(`${index + 1}. ${project.name}`))
    // Word wrap the description
    const words = project.description.split(" ")
    let line = ""
    words.forEach((word) => {
      if ((line + word).length > 50) {
        console.log(chalk.white(`   ${line}`))
        line = word + " "
      } else {
        line += word + " "
      }
    })
    if (line) console.log(chalk.white(`   ${line}`))
    console.log(chalk.gray(`   Stack: ${project.stack}`))
    console.log(chalk.magenta(`   🔗 ${project.link}`))
    console.log()
  })

  console.log(
    chalk.gray("Tip:") +
      chalk.white(" Use ") +
      chalk.magenta("cmd/ctrl + click") +
      chalk.white(" to open links directly\n")
  )

  // Project actions
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: chalk.white("What would you like to do?"),
      choices: [
        ...PROJECTS.map((project, index) => ({
          name: chalk.blue(`${index + 1}. Visit ${project.name}`),
          value: `visit_${index}`,
        })),
        { name: chalk.blue("View more projects"), value: "more" },
        { name: chalk.red("Back to main menu"), value: "back" },
      ],
      styles: {
        selected: chalk.white,
      },
      prefix: "💡",
    },
  ])

  if (action === "back") {
    console.clear()
    return
  }

  if (action === "more") {
    await open("https://github.com/rudra016?tab=repositories")
    console.log(chalk.green("\n✨ Opening GitHub repositories...\n"))
    return
  }

  const projectIndex = parseInt(action.split("_")[1])
  const project = PROJECTS[projectIndex]
  await open(project.link)
  console.log(chalk.green(`\n✨ Opening ${project.name}...\n`))
}

/**
 * Main application loop
 */
async function main() {
  console.clear()
  while (true) {
    console.log("\n")
    displayHeader()
    console.log("\n")

    console.log(
      chalk.gray("Tip:") +
        chalk.white(" Use ") +
        chalk.magenta("cmd/ctrl + click") +
        chalk.white(" to open links directly\n")
    )

    const choices = [
      {
        name: chalk.blue("View my Projects"),
        value: "projects",
      },
      {
        name: chalk.blue("See my Experience"),
        value: "experience",
      },
      {
        name: chalk.blue("Visit my Portfolio"),
        value: "portfolio",
      },
      {
        name: chalk.blue("Send me an Email"),
        value: "email",
      },
      {
        name: chalk.blue("Check out my GitHub"),
        value: "github",
      },
      {
        name: chalk.red("Exit"),
        value: "exit",
      },
    ]

    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: chalk.white("What would you like to do?"),
        choices,
        styles: {
          selected: chalk.white,
        },
        prefix: "💡",
      },
    ])
    try {
      switch (action) {
        case "projects":
          await showProjects()
          break
        case "experience":
          console.clear()
          console.log(chalk.white.bold("\nExperience\n"))
          console.log(chalk.yellow('Feb 2025 - Present'), chalk.white(': Software Engineer at Roro.io'))
          console.log(chalk.yellow('July 23 2024 - Feb 10 2025'), chalk.white(': Full Stack Developer Intern at Banao Technologies'))
          console.log(chalk.yellow('Sept 5 2023 - Sept 5 2024'), chalk.white(': Technical Lead at GDSC BBDITM'))
          console.log('\n')
          await inquirer.prompt([
            {
              type: 'input',
              name: 'back',
              message: chalk.gray('Press Enter to return to the main menu...'),
            },
          ])
          console.clear()
          break
        case "portfolio":
          await open("https://www.rudrakumar.site/")
          break
        case "email":
          await open("mailto:rudra619kumar@gmail.com")
          break
        case "github":
          await open("https://github.com/rudra016")
          break
        case "exit":
          console.log(
            chalk.blue("\n👋 Thank you for visiting! Have a great day!\n")
          )
          process.exit(0)
      }

      if (action !== "projects" && action !== "exit") {
        console.log(chalk.green("\n✨ Opening requested link...\n"))
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.clear()
      }
    } catch (error) {
      console.error(
        chalk.red("\n❌ Error: Could not open the requested link\n")
      )
      console.error(error)
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
  }
}

main().catch(console.error)